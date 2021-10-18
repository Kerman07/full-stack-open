const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const body = request.body;

  const passwordHash = await bcrypt.hash(body.password, 10);
  const newUser = new User({
    username: body.username,
    name: body.name,
    password: passwordHash,
  });

  const savedUser = await newUser.save();
  response.json(savedUser);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = userRouter;
