import Person from "./Person.js";

const Persons = ({ persons, newFilter, deletePerson }) => {
  const filtered = persons.filter((person) => {
    const lower = person.name.toLowerCase();
    return lower.includes(newFilter.toLowerCase());
  });

  return filtered.map((person) => (
    <Person key={person.name} person={person} deletePerson={deletePerson} />
  ));
};

export default Persons;
