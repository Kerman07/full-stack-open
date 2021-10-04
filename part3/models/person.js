const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((res) => console.log("connected to MongoDB"))
  .catch((err) => console.log("error connectiong to MongoDB", error));

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (per, returnedPerson) => {
    returnedPerson.id = returnedPerson._id.toString();
    delete returnedPerson._id;
    delete returnedPerson.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
