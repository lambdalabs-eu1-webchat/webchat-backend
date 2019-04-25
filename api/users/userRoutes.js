const express = require('express');
const routes = express.Router();

const url = require('../consts/url');
const error = require('../consts/error');
const User = require('./userHandlers');

routes.use(express.json());

/*
[GET] Returns all users
Params: none,
Body: none,
Query string: none,
*/
routes.get(url.users, async (req, res) => {
  try {
    const users = await req.context.models.User.find();
    // const userList = User.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
});

/*
[GET] Returns user by id
Params: user id (integer),
Body: none,
Query string: none,
*/
routes.get(url.usersById, (req, res) => {
  const { id } = req.params;
  const user = User.getUserById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json(error.getUserById);
  }
});

module.exports = routes;
