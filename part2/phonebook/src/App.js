import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
        <div key={person.name}>{person.name} {person.number}</div>
      ))}
    </div>
  );
};

export default App;
