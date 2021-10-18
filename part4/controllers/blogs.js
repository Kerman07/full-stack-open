const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name id");
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const user = await User.findOne({});
  const blog = new Blog({ ...request.body, user: user });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result);
  await user.save();
  response.status(201).json(result);
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
  });
  response.json(updatedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
