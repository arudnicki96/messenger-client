const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  dialogId: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    trim: false,
    required: true,
  },
});

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;
