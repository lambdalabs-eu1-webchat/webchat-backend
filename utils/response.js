const response = {
  deleteUser: { message: `The user has been removed from the database`},
  duplicateRoom: {
    message: 'Some/all rooms were not added because their names already exist',
  },
};

module.exports = response;
