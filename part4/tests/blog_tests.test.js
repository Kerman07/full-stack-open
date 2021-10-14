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

test("the unique identifier property of the blog posts is named id", async () => {
  const blogs = await helper.getAllBlogs();
  const blogToTest = blogs[0];
  expect(blogToTest.id).toBeDefined();
});

test("new blog post is saved successfully", async () => {
  const newBlog = { title: "test", author: "test", url: "test", likes: 1 };
  const returnedBlog = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfter = await helper.getAllBlogs();
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1);
  expect(newBlog.url).toEqual(returnedBlog.body.url);
});

afterAll(() => {
  mongoose.connection.close();
});
