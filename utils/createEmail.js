const createEmail = (guest, hotel, formattedChats) => {
const emailBody = `
<header>
  <p>Dear ${guest.name},</p>
  <p>Please see a copy of your conversation below:</p>
</header>
<section>
  <div>${formattedChats.map(chat => `<p>${chat}</p>`).join('')}</div>
</section>
<section>
  <div>
    <p>Should you require any further assistance, please contact ${hotel.name}.</p>
    <p>Best Wishes,<br>Team Frontdesk</p>
  </div>
</section>
`;
return emailBody;
};

module.exports = createEmail;
