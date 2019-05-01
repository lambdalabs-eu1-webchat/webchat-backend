const mongoose = require('mongoose');
const MODEL_NAMES = require('../utils/MODEL_NAMES');

const roomSchema = new mongoose.Schema({
  //_id
  name: {
    type: String,
    required: true,
  },
});

// schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const hotelSchema = new mongoose.Schema({
  // _id
  rooms: [roomSchema],
  name: {
    type: String,
    required: true,
  },
  motto: {
    type: String,
  },
});

const Hotel = mongoose.model(MODEL_NAMES.HOTELS, hotelSchema);

module.exports = Hotel;
