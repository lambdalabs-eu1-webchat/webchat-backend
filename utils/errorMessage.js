const errorMessage = {
  getUsers: { message: 'The users could not be retrieved' },
  getUserById: { message: 'The user could not be retrieved' },
  updateUser: { message: 'The user could not be updated' },
  deleteUser: { message: 'The user could not be deleted' },
  addUser: { message: 'The user could not be added' },
  getUsers: { message: 'the users could not be retrieved' },
  getUserById: { message: 'the user could not be retrieved' },
  noHotel: { message: 'no hotel exists with this id' },
  addHotel: { message: 'the hotel could not be added' },
  updateHotel: {
    message:
      'the hotel could not be updated or you did not provide any new information',
  },
  addRoom: { message: 'the room could not be added' },
  updateRoom: { message: 'the room could not be updated' },
  removeRoom: { message: 'the room could not be deleted' },
  invalidObjectId: { message: 'an invalid ObjectId was passed' },
  invalidHotelPost: {
    message: 'a hotel must be added with at least a name and motto',
  },
  invalidHotelPut: {
    message: 'a hotel must be changed with at least an updated name or motto',
  },
  restrictedHotelPut: {
    message: 'hotel rooms cannot be ammended via this endpoint',
  },
  duplicateHotel: {
    message: 'a hotel with this name already exists',
  },
};

module.exports = errorMessage;
