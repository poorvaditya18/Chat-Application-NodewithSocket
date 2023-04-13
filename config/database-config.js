const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect("mongodb://localhost/chatApp"); // helps to connect to the mongoDB Server  whethter local or deployed
};

module.exports = connect;
