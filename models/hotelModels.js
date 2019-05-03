const mongoose = require('mongoose');
const MODEL_NAMES = require('../utils/MODEL_NAMES');
const { FREE, PLUS, PRO } = require('../utils/PAYMENT_PLANS');

const roomSchema = new mongoose.Schema({
  //_id
  name: {
    type: String,
    required: true,
  },
});

const billingSchema = new mongoose.Schema({
  //_id
  customer: {
    email: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  card: {
    id: {
      type: String,
      required: true,
    },
    last_four: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    expiration: {
      month: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
  },
  plan_id: {
    type: String,
    required: true,
  },

  sub_id: {
    required: true,
    type: String,
  },
});

// schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const hotelSchema = new mongoose.Schema({
  // _id
  rooms: [roomSchema],
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  motto: {
    type: String,
  },
  plan: {
    type: String,
    enum: [FREE, PLUS, PRO],
    default: FREE,
  },
  billing: billingSchema,
});

const Hotel = mongoose.model(MODEL_NAMES.HOTELS, hotelSchema);

module.exports = Hotel;
