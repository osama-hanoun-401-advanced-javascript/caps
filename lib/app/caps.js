// using "slick" in the URL as a namespace

module.exports = (io) => {
  const caps = io.of('/caps'); // of is only for slick namespace (url part)

  caps.on('connection', (socket) => {
    console.log('Welcome to CAPS App!!! ', socket.id);
    socket.on('join', (room) => {
      try {
        socket.leave(room);
      }catch(e){console.log(e);}
      socket.join(room);
    });
    socket.on('message',data => {
      caps.to('general').emit('message',data);
    });
  });
};