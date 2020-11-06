const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "Name is required!",
  },
});

module.exports = mongoose.model("Chatroom", chatroomSchema);
