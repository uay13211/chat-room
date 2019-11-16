const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  registerDate: {
    type: Date,
    default: Date.now,
    sparse: true
  }
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
