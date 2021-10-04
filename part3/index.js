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

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((res) => {
      if (res) response.json(res);
      else response.status(404).end();
    })
    .catch(() => response.status(500).end());
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * MAX);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }

  const found = persons.find((person) => person.name === body.name);
  if (found) return response.status(409).json({ error: "name must be unique" });

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
