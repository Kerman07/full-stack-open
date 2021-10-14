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

describe("when blogs are present", () => {
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
});

describe("when saving a new blog", () => {
  test("new blog post is saved successfully with valid data", async () => {
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

  test("if likes property is missing from request it will default to 0", async () => {
    const newBlog = { title: "test", author: "test", url: "test" };
    const returnedBlog = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(returnedBlog.body.likes).toBe(0);
  });

  test("if title and url properties are missing it fails with status 400", async () => {
    const newBlog = { author: "test", likes: 5 };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deleting a blog post", () => {
  test("works with a valid id", async () => {
    const blogs = await helper.getAllBlogs();
    const blogToDelete = blogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAfter = await helper.getAllBlogs();
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe("updating a blog post", () => {
  test("works with a valid id", async () => {
    const blogs = await helper.getAllBlogs();
    const blogToUpdate = blogs[0];

    const update = { likes: 35 };
    const returnedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(returnedBlog.body.likes).toBe(35);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
