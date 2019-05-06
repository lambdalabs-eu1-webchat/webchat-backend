module.exports = rating;

const { models } = require('../../models/index');

async function rating(rating, ticket_id, socket, io) {
  const { user } = socket;
  // get the chat
  const chat = await models.Chat.findOne({ 'guest.id': user._id });
  // update the rating for the ticket
  chat.tickets.map(ticket => {
    if (!ticket._id.equals(ticket_id)) return ticket;
    return { ...ticket, rating };
  });
  // save the chat to the guest
  chat.save(error => {
    if (error) {
      console.error(error);
    } else {
      socket.chat = chat;
    }
  });
}
