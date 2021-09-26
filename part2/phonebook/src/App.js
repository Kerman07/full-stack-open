import React, { useState } from "react";
import Filter from "./components/Filter.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNewEntry = (event) => {
    event.preventDefault();
    const newObject = { name: newName, number: newNumber };
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleName = (event) => setNewName(event.target.value);
  const handleNumber = (event) => setNewNumber(event.target.value);
  const handleFilter = (event) => setNewFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <Filter onChange={handleFilter} value={newFilter} />
      <h3>Add a new</h3>
      <form onSubmit={handleNewEntry}>
        <div>
          name: <input onChange={handleName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) => {
          const lower = person.name.toLowerCase();
          return lower.includes(newFilter.toLowerCase());
        })
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};

export default App;
