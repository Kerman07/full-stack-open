const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("testing the login", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const newUser = {
      username: "kerim",
      name: "Kerim",
      password: "weak",
    };
    await api.post("/api/users").send(newUser);
  });

  test("works with valid data", async () => {
    const dataForLogin = { username: "kerim", password: "weak" };
    const result = await api
      .post("/api/login")
      .send(dataForLogin)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(result.body.token).toBeDefined();
  });

  test("fails with invalid data", async () => {
    const dataForLogin = { username: "kerim", password: "weakly" };
    const result = await api.post("/api/login").send(dataForLogin).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
