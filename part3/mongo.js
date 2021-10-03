const mongoose = require("mongoose");

const len = process.argv.length;

if (len < 3) {
  console.log("Missing password. Usage:");
  console.log("- get all persons: node mongo.js <yourpassword>");
  console.log("- add new person: node mongo.js <yourpassword> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];
const baseurl = `mongodb+srv://fullstack:${password}@cluster0.ev7nf.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(baseurl);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (len > 3) {
  const name = process.argv[3];
  const number = process.argv[4];
  const newPerson = new Person({
    name: name,
    number: number,
  });
  newPerson.save().then((res) => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
    process.exit(0);
  });
} else if (len === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((per) => console.log(`${per.name} ${per.number}`));
    mongoose.connection.close();
  });
}
