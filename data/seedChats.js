const faker = require('faker');
const { models } = require('../models/index');

const seedChats = async hotels => {
  // for each hotel
  const chats = [];
  hotels.forEach((hotel, i) => {
    hotel_id = hotel._id;
    const queueOrActiveFunc = queueOrActive(); // function that toggles active and queue
    hotel.guests.forEach((guest, j) => {
      // get the staff member
      const receptionist =
        hotel.receptionists[
          Math.round(
            remainder(j, hotel.receptionists.length) *
              hotel.receptionists.length,
          )
        ];
      // make a chat log for each guest
      const tickets = [];
      const numberTickets = Math.floor(Math.random() * (10 - 1) + 1);
      for (let i = 0; i < numberTickets; i++) {
        const status =
          guest.is_left || !(i === numberTickets - 1)
            ? 'closed'
            : queueOrActiveFunc();
        tickets.push({
          status,
          messages: makeMessages(guest, receptionist),
          rating:
            status === 'closed'
              ? Math.floor(Math.random() * (5 - 1) + 1)
              : null,
        });
      }
      chats.push({
        tickets,
        hotel_id,
        guest: {
          name: guest.name,
          id: guest._id,
        },
        room: guest.room,
        staff_member: {
          name: receptionist.name,
          id: receptionist._id,
        },
      });
    });
  });
  const promises = [];
  console.log(`chats created: ${chats.length} `);
  for (let i = 0; i < chats.length; i = i + 20) {
    if (i + 20 > chats.length) {
      promises.push(models.Chat.insertMany(chats.slice(i, chats.length - 1)));
    } else {
      promises.push(models.Chat.insertMany(chats.slice(i, i + 20)));
    }
  }

  return promises;
};

function makeMessages(guest, receptionist) {
  const numMessages = Math.random() * (20 - 1) + 1;
  const messages = [];
  for (let i = 0; i < numMessages; i++) {
    messages.push(
      makeMessage(
        i % 2 === 0 ? guest.name : receptionist.name,
        i % 2 === 0 ? guest._id : receptionist._id,
      ),
    );
  }
  return messages;
}

function makeMessage(name, id) {
  return {
    sender: {
      name,
      id,
    },
    text: faker.lorem.sentence(Math.random() * (100 - 8) + 8),
  };
}

function queueOrActive() {
  let returnVal = 'queue';
  return function() {
    if (returnVal === 'queue') {
      returnVal = 'active';
    } else {
      returnVal === 'queue';
    }
    return returnVal;
  };
}

function remainder(numerator, denominator) {
  const num = numerator / denominator;
  return num - Math.floor(num);
}
module.exports = seedChats;
