module.exports = makeRating;

const { models } = require('../../models/index');

async function makeRating(rating, socket) {
  console.log('++++++++++++++++++++HERE=======================');
  const { user } = socket;
  // get the chat
  const chat = await models.Chat.findOne({ 'guest.id': user._id });
  // update the rating for the ticket
  chat.tickets[chat.tickets.length - 1].rating = rating;

  // save the chat to the guest
  chat.save(error => {
    if (error) {
      console.error(error);
    } else {
      socket.chat = chat;
    }
  });
}
