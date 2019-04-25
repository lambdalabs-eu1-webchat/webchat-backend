const users = require('../../dummyData.js/users');

const getUsers = () => {
  return users;
};

const getUserById = id => {
  const parsedId = parseInt(id);
  const user = users.filter(user => user.id === parsedId);
  if (user.length > 0) {
    return user[0];
  }
};

module.exports = {
  getUsers,
  getUserById,
};
