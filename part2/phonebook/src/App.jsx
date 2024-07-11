import { useState, useEffect } from "react";
import personService from "./services/persondb";

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

const PhoneList = ({ people, filterText, handlePersonDelete }) => {
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <div>
      {filteredPeople.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handlePersonDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((personData) => {
      setPersons(personData);
    });
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
      id: `${persons.length + 1}`,
    };

    personService
      .create(newPerson)
      .then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };

  const handlePersonDelete = (id) => {
    if (
      !window.confirm(
        `Delete ${persons.find((person) => person.id === id).name} ?`,
      )
    ) {
      return;
    }
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id)); // Update state after deletion
      })
      .catch((error) => {
        console.log("Error removing person:", error);
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
      <PhoneList
        people={persons}
        filterText={filter}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
