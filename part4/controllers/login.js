const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });

  const passwordCheck =
    user === null ? false : await bcrypt.compare(body.password, user.password);
  if (!(user && passwordCheck))
    return response.status(401).json({ error: "Invalid username or password" });

  const dataForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(dataForToken, process.env.SECRET);
  response.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
