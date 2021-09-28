import React, { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import Persons from "./components/Persons.js";
import PersonForm from "./components/PersonForm.js";
import personService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleNewEntry = (event) => {
    event.preventDefault();
    const newObject = { name: newName, number: newNumber };
    const isFound = persons.find((person) => person.name === newName);
    if (isFound) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one ?`
        )
      )
        personService.updatePerson(isFound.id, newObject).then((response) => {
          setPersons(
            persons.map((person) =>
              person.name === newName ? response : person
            )
          );
          setNewName("");
          setNewNumber("");
        });
    } else {
      personService.create(newObject).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleName = (event) => setNewName(event.target.value);
  const handleNumber = (event) => setNewNumber(event.target.value);
  const handleFilter = (event) => setNewFilter(event.target.value);

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`))
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((per) => per.id !== person.id));
      });
  };

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
      <Persons
        persons={persons}
        newFilter={newFilter}
        deletePerson={handleDelete}
      />
    </div>
  );
};

export default App;
