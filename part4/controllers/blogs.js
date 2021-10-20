const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name id");
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const decoded = jwt.verify(request.token, process.env.SECRET);
  if (!decoded.id)
    return response.status(401).json({ error: "invalid or missing token" });

  const user = await User.findById(decoded.id);
  const blog = new Blog({ ...request.body, user: user.id });
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
  const decoded = jwt.verify(request.token, process.env.SECRET);
  const userId = decoded.id;
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  }
  response
    .status(401)
    .json({ error: "you are not authorized to delete that blog" });
});

module.exports = blogRouter;
