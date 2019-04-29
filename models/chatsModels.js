const mongoose = require("mongoose");
const MODEL_NAMES = require("./MODEL_NAMES");

// schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const chatSchema = new mongoose.Schema({
  // _id
  tickets: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
      },
      hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODEL_NAMES.HOTELS
      },
      status: {
        type: String
      },
      rating: {
        type: Number
      },
      staff_member: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: MODEL_NAMES.USERS
        },
        name: {
          type: String
        }
      },
      messages: [
        {
          sender: {
            name: {
              type: String
            },
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: MODEL_NAMES.USERS
            }
          },
          text: {
            type: String
          }
        }
      ]
    }
  ]
});

const Chats = mongoose.model(MODEL_NAMES.CHATS, chatSchema);

module.exports = Chats;
