const mongoose = require('mongoose');

const User = require('./usersSchema');
const Hotel = require('./hotelModels');
const Chat = require('./chatsModels');

mongoose.set('useCreateIndex', true);
const connectDb = () => {
  console.log(process.env.DATABASE_URL);
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { Hotel, User, Chat };

module.exports = {
  connectDb,
  models,
};
