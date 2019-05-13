const response = {
  deleteUser: { message: 'The user has been removed from the database.' },
  duplicateRoom: {
    message: 'Some/all rooms were not added because their names already exist.',
  },
  updateUser: { message: 'The user has been removed from the database.' },
  sendChatLog: {
    message: 'Email sucessfully sent.',
  },
  noChats: {
    message: 'This user has no associated chats.'
  }
};

module.exports = response;
