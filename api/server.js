const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const userRoutes = require('../routes/userRoutes');

const server = express();

server.use(compression());
server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json({ message: 'API is live!' });
});


server.use(userRoutes);

module.exports = server;
