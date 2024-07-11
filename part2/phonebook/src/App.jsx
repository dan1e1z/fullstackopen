import { useState, useEffect } from "react";
import axios from "axios";

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  filter,
  handleFilterChange,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          filter shown with
          <input value={filter} onChange={handleFilterChange} />
        </div>
        <h3>add a new</h3>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const PhoneList = ({ people, filterText }) => {
  return (
    <div>
      {people
        .filter((person) =>
          person.name.toLowerCase().includes(filterText.toLowerCase()),
        )
        .map((person, i) => (
          <div key={i}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response.data);
    };

    const promise = axios.get("http://localhost:3001/persons");
    promise.then(eventHandler);
  }, []); // [] means, runs after initial render, [count] effect runs on that dependencies changes

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // send to backend
    const newPerson = {
      name: newName,
      number: newNumber,
      id: `${persons.length}`,
    };

    axios
      .post("http://localhost:3001/persons", newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h3>Numbers</h3>
      <PhoneList people={persons} filterText={filter} />
    </div>
  );
};

export default App;
