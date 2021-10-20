const logger = require("./logger");

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
    return response.status(401).send({ error: "invalid token" });
  next(error);
};

module.exports = { unknownEndpoint, errorHandler };
