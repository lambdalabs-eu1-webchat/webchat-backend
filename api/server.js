<<<<<<< HEAD
const express = require('express'),
  app = express(),
  port = 4000,  // not sure if we should place a port [4000] since this is production
  io = require('socket.io').listen(app.listen(port))
const cors = require('cors');
const helmet = require('helmet');
const { models } = require('../models/index');
=======
const express = require('express');
>>>>>>> origin/scale-seeds

const server = express();

// import all middleware and pass server to index.js
require('../middleware')(server);

<<<<<<< HEAD
app.set('views', __dirname + 'views')
  .engine('html', require('ejs').renderFile)
  // .use(app.router)
  .use(express.static(__dirname + '/public'))
  


// server.get('/', (req, res) => {
//   res.status(200).json({ message: 'API works!' });
// });

const userRoutes = require('../routes/userRoutes');

server.use(userRoutes);
=======
// import all routes and pass server to index.js
require('../routes')(server);
>>>>>>> origin/scale-seeds

module.exports = server;
