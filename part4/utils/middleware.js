const logger = require("./logger");

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError")
    return response.status(400).send({ error: "malformatted id" });
  if (error.name === "ValidationError")
    return response
      .status(400)
      .send({ error: "validation failed for the request" });
  next(error);
};

module.exports = { unknownEndpoint, errorHandler };
