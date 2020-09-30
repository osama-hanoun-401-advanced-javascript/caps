'use strict';

const io = require('socket.io')(3000);
require('./app/caps')(io);

io.on('connection', (socket) => {
  console.log('Welcome to My Global Connection!');
});