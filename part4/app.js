const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected to mongoDB"))
  .catch((err) => logger.error("error connecting to mongoDB", error.message));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
