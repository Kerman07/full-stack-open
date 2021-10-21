const logger = require("./logger");
const jwt = require("jsonwebtoken");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer "))
    request["token"] = authorization.substring(7);
  else request["token"] = null;
  next();
};

const userExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;
    request["user"] = userId;
  }
  next();
};

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError")
    return response.status(400).send({ error: "malformatted id" });
  if (error.name === "ValidationError")
    return response.status(400).send({ error: error.message });
  if (error.name === "MongoServerError")
    return response.status(400).send({ error: "username already exists" });
  if (error.name === "JsonWebTokenError")
    return response.status(401).send({ error: "invalid or missing token" });
  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
