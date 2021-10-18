const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  name: String,
  password: { type: String, required: true },
});

userSchema.set("toJSON", {
  transform: (user, returnedUser) => {
    returnedUser.id = user._id.toString();
    delete returnedUser._id;
    delete returnedUser.__v;
    delete returnedUser.password;
  },
});

module.exports = mongoose.model("User", userSchema);
