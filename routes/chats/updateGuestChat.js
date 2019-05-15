const { models } = require('../../models/index');

module.exports = updateGuestChat;

async function updateGuestChat(socket) {
  socket.chat = await models.Chat.findById({ _id: socket.chat._id });
}
