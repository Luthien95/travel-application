const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  })
);

exports.User = User;
