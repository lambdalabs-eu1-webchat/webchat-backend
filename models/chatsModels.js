const mongoose = require('mongoose');
const MODEL_NAMES = require('./MODEL_NAMES');

const ticketSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  rating: {
    type: Number,
  },
  staff_member: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.USERS,
    },
    name: {
      type: String,
    },
  },

  messages: [
    {
      sender: {
        name: {
          type: String,
        },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: MODEL_NAMES.USERS,
        },
      },
      text: {
        type: String,
      },
    },
  ],
});

// schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const chatSchema = new mongoose.Schema({
  // _id
  tickets: [ticketSchema],
  guest: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.USERS,
    },
    name: {
      type: String,
    },
  },
  staff_member: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.USERS,
    },
    name: {
      type: String,
    },
  },
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAMES.HOTELS,
  },
  room: {
    name: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.HOTELS_ROOMS,
    },
  },
});

const Chats = mongoose.model(MODEL_NAMES.CHATS, chatSchema);

module.exports = Chats;
