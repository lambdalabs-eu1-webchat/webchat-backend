const errorMessage = {
  getUsers: { message: 'The users could not be retrieved' },
  getUserById: { message: 'The user could not be retrieved' },
  invalidCredentials: { message: 'Invalid credentials' },
  duplicateEmail: { message: 'This email is taken already.' },
  updateUser: { message: 'The user could not be updated' },
  invalidUserName: { message: 'Invalid user name' },
  deleteUser: { message: 'The user could not be deleted' },
  addUser: { message: 'The user could not be added.' },
  superAdminError: { message: 'Can\'t create Super Admin in this endpoint.' },
  noHotel: { message: 'No hotel exists with this id.' },
  addHotel: { message: 'The hotel could not be added.' },
  updateHotel: {
    message:
      'The hotel could not be updated or you did not provide any new information.',
  },
  addRoom: { message: 'The room could not be added.' },
  updateRoom: { message: 'The room could not be updated.' },
  removeRoom: { message: 'The room could not be deleted.' },
  invalidObjectId: { message: 'An invalid ObjectId was passed.' },
  invalidHotelPost: {
    message: 'A hotel must be added with at least a name and motto.',
  },
  invalidHotelPut: {
    message: 'A hotel must be changed with at least an updated name or motto.',
  },
  restrictedHotelPut: {
    message: 'Hotel rooms cannot be ammended via this endpoint.',
  },
  duplicateHotel: {
    message: 'A hotel with this name already exists.',
  },
  typeArr: {
    message: 'An array was expected but not found',
  },
  noRoomName: {
    message: 'Every room must have a provided name',
  },
  noRoom: { message: 'No room exists with this id.' },
  invalidRoomPut: {
    message: 'A room must be updated with a new name.',
  },
  invalidPlan: {
    message: 'The plan you requested does not exist.',
  },
  tooManyUsers: {
    message: 'There are too many staff accounts on this hotel to switch plans.',
  },
  missingPassword: { message: 'Missing password' },
};

module.exports = errorMessage;
