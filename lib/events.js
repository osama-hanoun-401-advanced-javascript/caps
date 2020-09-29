'use strict';

const net = require('net');

const server = net.createServer();
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`server is running on ${port}`));
let socketPool = {};
server.on('connection', (socket) => {
  console.log('user is online!!!');
  (Object.keys(socketPool)).includes('vendor') ? socketPool['driver'] = socket : socketPool['vendor'] = socket;
  console.log('socketPool  ', socketPool);

  socket.on('data', buffer => {
    let msg = JSON.parse(buffer.toString());
    console.log('EVENT  ', msg);
    broadcast(msg);
  });

  server.on('error', (e) => {
    console.log('ERROR !!!!!!! ', e);
  });
});

function broadcast(msg) {
  let data = JSON.stringify(msg);
  if(msg.event === 'in-transit'){
    console.log ( 'EVENT   ', msg);
  }
  else if (msg.event === 'pickup') {
    socketPool['driver'].write(data);
  }
  else if (msg.event === 'delivered' ) {
    socketPool['vendor'].write(data);
  }
  
}