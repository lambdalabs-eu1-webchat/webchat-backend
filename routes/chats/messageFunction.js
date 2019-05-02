module.exports = { messageGuest };

const { models } = require('../../models/index');

const { CHATLOG, MESSAGE } = require('./constants');

const getLastTicket = require('../../utils/getLastTicket');

async function messageGuest(text, socket, io) {
  const { user } = socket;
  const message = {
    sender: { id: user._id, name: user.name },
    text,
  };
  // start getting chat
  const chatPromise = models.Chat.findById({ _id: socket.chat._id });
  // check if this message opens a new ticket
  const currentTicket = getLastTicket(socket.chat);
  // if last ticket is closed make a new one
  if (!currentTicket || currentTicket.status === 'closed') {
    const newTicket = {
      status: 'queued',
      messages: [message],
    };
    // need chat from db to updata
    const chat = await chatPromise;
    chat.tickets.push(newTicket);
    chat.save(async (error, newChat) => {
      if (error) {
        socket.emit('console', error);
      } else {
        // send the updated chat
        io.in(chat._id).emit(CHATLOG, newChat);
        // tell the employees that it is in the queue
        io.in('add queue', newChat);
      }
    });
  } else {
    io.in(socket.chat._id).emit(MESSAGE, message);

    // get the promise to update
    const chat = await chatPromise;
    chat.tickets[chat.tickets.length - 1].messages.push(message);
    chat.save(error => {
      if (error) {
        socket.emit('console', 'saving message');
        socket.emit('console', error);
      }
    });
  }
}

async function messageStaff() {}
