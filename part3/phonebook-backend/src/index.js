const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

morgan.token("content", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content",
  ),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  let id;
  do {
    id = Math.floor(Math.random() * 10000);
  } while (persons.find((person) => person.id === id));
  return String(id);
};

app.get("/", (request, response) => {
  response.send("<h1>see /api/persons</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const numberOfPersons = persons.length;
  const date = new Date();
  response.send(`
    <div>Phonebook has info for ${numberOfPersons} people</div>
    <div>${date}</div>`);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  // console.log(body);
  // console.log(body.name);
  // no name
  if (!body.name) {
    return response.status(400).json({ error: "missing name" });
  }
  // no number
  if (!body.number) {
    return response.status(400).json({ error: "missing number" });
  }

  // no unqiue name
  const uniquePerson = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase(),
  );
  if (uniquePerson) {
    return response.status(400).json({ error: "name must be unique" });
  }

  // create new person object
  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(newPerson);

  // console.log(newPerson);
  response.json(newPerson);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id == id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// request (client -> server)
// response (server -> client)
