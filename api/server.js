const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { models } = require('../models/index');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(async (req, res, next) => {
  try {
    req.context = {
      models,
    };
    next();
  } catch (error) {
    console.error(error);
  }
});

server.get('/', (req, res) => {
  res.status(200).json({ message: 'API works!' });
});

const userRoutes = require('./users/userRoutes');

server.use(userRoutes);

module.exports = server;
