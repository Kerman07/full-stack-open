const PersonForm = ({
  handleNewEntry,
  handleName,
  handleNumber,
  newName,
  newNumber,
}) => {
  return (
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
  );
};

export default PersonForm;
