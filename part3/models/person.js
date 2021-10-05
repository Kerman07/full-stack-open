const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((res) => console.log("connected to MongoDB"))
  .catch((err) => console.log("error connectiong to MongoDB", error));

const personSchema = mongoose.Schema({
  name: { type: String, unique: true, minLength: 3, required: true },
  number: { type: String, minLength: 8, required: true },
});

personSchema.set("toJSON", {
  transform: (per, returnedPerson) => {
    returnedPerson.id = returnedPerson._id.toString();
    delete returnedPerson._id;
    delete returnedPerson.__v;
  },
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", personSchema);
