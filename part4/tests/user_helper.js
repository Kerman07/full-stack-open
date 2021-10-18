const User = require("../models/user");

const initialUsers = [
  {
    username: "kerman07",
    name: "Kerim",
    password: "somehash",
  },
  {
    username: "nekky",
    name: "Nermina",
    password: "somehash2",
  },
  {
    username: "soca",
    name: "Jasmina",
    password: "somehashtoo",
  },
];

const getAllUsers = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initialUsers, getAllUsers };
