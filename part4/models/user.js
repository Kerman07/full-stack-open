const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-beautiful-unique-validation");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: "Two users cannot share the same username ({VALUE})",
    minLength: 3,
  },
  name: String,
  password: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (user, returnedUser) => {
    returnedUser.id = user._id.toString();
    delete returnedUser._id;
    delete returnedUser.__v;
    delete returnedUser.password;
  },
});

module.exports = mongoose.model("User", userSchema);
