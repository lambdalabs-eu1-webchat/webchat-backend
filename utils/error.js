const error = {
  getUsers: {message: 'the users could not be retrieved'},
  getUserById: {message: 'the user could not be retrieved'},
  noHotel: {message: 'no hotel exists with this id'},
  addHotel: {message: 'the hotel could not be added'},
  updateHotel: {message: 'the hotel could not be updated'},
  addRoom: {message: 'the room could not be added'},
  updateRoom: {message: 'the room could not be updated'},
  removeRoom: {message: 'the room could not be deleted'},
  invalidObjectId: {message: 'an invalid ObjectId was passed'},
};

module.exports = error;
