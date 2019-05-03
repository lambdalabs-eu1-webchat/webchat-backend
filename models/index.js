const mongoose = require('mongoose');
const User = require('./usersModels');
const Hotel = require('./hotelModels');
const Chat = require('./chatsModels');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { Hotel, User, Chat };

module.exports = {
  connectDb,
  models,
};
