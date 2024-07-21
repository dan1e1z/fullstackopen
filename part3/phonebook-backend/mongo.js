const mongoose = require("mongoose");

const len = process.argv.length;

if (len < 3) {
  console.log("Provide password agrument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://daniel:${password}@cluster0.vjcv3zl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (len === 3) {
  Person.find({}).then((persons) => {
    console.log("Phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (len === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then(() => {
    console.log(`Added ${name} number ${number} to the phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Invalid arguments");
  process.exit(1);
}
