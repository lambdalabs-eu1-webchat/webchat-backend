const mongoose = require('mongoose');
const MODEL_NAMES = require('./MODEL_NAMES');
const TICKET_STATUSES = require('./TICKET_STATUSES.js');

const ticketSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [
      TICKET_STATUSES.ACTIVE,
      TICKET_STATUSES.QUEUED,
      TICKET_STATUSES.CLOSED,
    ],
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
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
      required: true,
    },
    name: {
      type: String,
      required: true,
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
    required: true,
  },
  room: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.HOTELS_ROOMS,
      required: true,
    },
  },
});

const Chats = mongoose.model(MODEL_NAMES.CHATS, chatSchema);

module.exports = Chats;
