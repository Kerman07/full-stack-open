const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./blog_helper");
const mongoose = require("mongoose");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

test("all blogs are returned in json format", async () => {
  const blogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(blogs.body).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
