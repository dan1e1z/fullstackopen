import { useState, useEffect } from "react";
import personService from "./services/persondb";
import "./styles.css";

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

const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return <div className={error ? "error" : "noError"}>{message}</div>;
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
  const [notificationMessage, setNotificationMessage] = useState("");
  const [error, setError] = useState(false);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`,
    };

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
            setNotificationMessage(`Updated ${newPerson.name} number`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 2000);
            setError(false);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            setNotificationMessage(
              `Information of ${newPerson.name} has already been removed from server `,
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 2000);
            setError(true);
          });
      }
      return;
    }

    personService
      .create(newPerson)
      .then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNewName("");
        setNewNumber("");
        setNotificationMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 2000);
        setError(false);
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };

  const handlePersonDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${personToDelete.name} ?`)) {
      return;
    }
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id)); // Update state after deletion
        setNotificationMessage(`Deleted ${personToDelete.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 2000);
        setError(false);
      })
      .catch((error) => {
        console.log("Error removing person:", error);
        setNotificationMessage(
          `Error deleting ${personToDelete.name} from server`,
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 2000);
        setError(true);
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
      {notificationMessage && (
        <Notification message={notificationMessage} error={error} />
      )}
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
