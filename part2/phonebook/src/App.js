import React, { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import Persons from "./components/Persons.js";
import PersonForm from "./components/PersonForm.js";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
      <h3>Add a new entry</h3>
      <PersonForm
        handleNewEntry={handleNewEntry}
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;
