import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewName = (event) => {
    event.preventDefault();
    const newObject = { name: newName };
    setPersons(persons.concat(newObject));
    setNewName("");
  };

  const handleInput = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewName}>
        <div>
          name: <input onChange={handleInput} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
