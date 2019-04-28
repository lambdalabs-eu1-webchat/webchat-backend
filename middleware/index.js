const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

module.exports = server => {
  server.use(compression());
  server.use(helmet());
  server.use(cors());
  server.use(express.json());
};
