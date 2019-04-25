const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server =  express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const userRoutes = require('./users/userRoutes');

server.use(userRoutes);

module.exports = server;
