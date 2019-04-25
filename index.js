const server = require('./api/server');
require('dotenv').config();

const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`server up on ${port}`));
