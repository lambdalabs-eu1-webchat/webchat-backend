const mongoose = require('mongoose');
const User = require('./usersModel');
const Hotel = require('./hotelModels');
const Chat = require('./chatsModels');

mongoose.set('useCreateIndex', true);
const connectDb = () => {
  console.log(process.env.DATABASE_URL);
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};
// Connect to MongoDB
// mongoose.connect('mongodb://yourusername:yourpassword@ds121825.mlab.com:11025/yourmongodb', {useNewUrlParser: true});
// mongoose.connection.once('open', function(){
//   console.log('Conection has been made!');
// }).on('error', function(error){
//     console.log('Error is: ', error);
// });

const models = { Hotel, User, Chat };

module.exports = {
  connectDb,
  models,
};
