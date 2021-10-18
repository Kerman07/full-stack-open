const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const userHelper = require("./user_helper");
const User = require("../models/user");

describe("testing the users api", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const mapped = userHelper.initialUsers.map((user) => new User(user));
    const promiseArray = mapped.map((user) => user.save());
    await Promise.all(promiseArray);
  });

  test("users are returned as json", async () => {
    const result = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body).toHaveLength(userHelper.initialUsers.length);
    const usernames = result.body.map((res) => res.username);
    expect(usernames).toContain("nekky");
  });

  test("new user can be created and password is hashed", async () => {
    const newUser = {
      username: "feko",
      name: "Ferid",
      password: "pass",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await userHelper.getAllUsers();
    expect(usersAfter).toHaveLength(userHelper.initialUsers.length + 1);
    expect(result.body.password).not.toEqual(newUser.password);
  });

  test("can't create an user if invalid data is provided", async () => {
    const newUser = {
      username: "zeko",
      name: "Zekija",
      password: "ps",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await userHelper.getAllUsers();
    expect(result.body.error).toEqual("password must be 3 characters long");
    expect(usersAfter).toHaveLength(userHelper.initialUsers.length);
  });

  test("can't create an user with the same username", async () => {
    const newUser = {
      username: "kerman07",
      name: "Kerimi",
      password: "weak",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);
    expect(result.body.error).toEqual("username already exists");
    const usersAfter = await userHelper.getAllUsers();
    expect(usersAfter).toHaveLength(userHelper.initialUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
