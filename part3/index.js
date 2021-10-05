require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person.js");

const app = express();
const MAX = 100000;

app.use(express.json());
app.use(express.static("build"));
app.use(cors());

morgan.token("data", (request, response) => {
  if (request.body.name)
    return JSON.stringify({
      name: request.body.name,
      number: request.body.number,
    });
  return null;
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((res) => response.json(res));
});

app.get("/info", (request, response) => {
  const time = new Date();
  Person.countDocuments({}).then((res) =>
    response.send(`<div>Phonebook has info for ${res} people</div>
  <p>${time}</p>`)
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((res) => {
      if (res) response.json(res);
      else response.status(404).end();
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((err) => next(err));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((res) => response.json(res))
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const updatedPerson = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, updatedPerson, {
    new: true,
  })
    .then((res) => response.json(res))
    .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unkown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError")
    return response.status(400).send({ error: "malformatted id" });
  else if (error.name === "ValidationError")
    return response.status(400).json({ error: error.message });
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
