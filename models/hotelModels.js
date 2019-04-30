const mongoose = require('mongoose');
const MODEL_NAMES = require('./MODEL_NAMES');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

// schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const hotelSchema = new mongoose.Schema({
  // _id
  rooms: [roomSchema],
  name: {
    type: String,
  },
  motto: {
    type: String,
  },
});

const Hotel = mongoose.model(MODEL_NAMES.HOTELS, hotelSchema);

module.exports = Hotel;
