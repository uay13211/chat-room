const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  sentDate: {
    type: Date,
    default: Date.now,
    sparse: true
  }
});

const Message = new mongoose.model("message", messageSchema);

module.exports = Message;
