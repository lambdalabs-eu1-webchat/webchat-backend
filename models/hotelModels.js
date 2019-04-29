const mongoose = require("mongoose");
const MODEL_NAMES = require("./MODEL_NAMES");

// schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const hotelSchema = new mongoose.Schema({
  // _id
  rooms: [
    {
      name: {
        type: String
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId
      }
    }
  ],
  name: {
    type: String
  },
  motto: {
    type: String
  }
});

const Hotel = mongoose.model(MODEL_NAMES.HOTELS, hotelSchema);

module.exports = Hotel;
