'use strict';
const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');

caps.on('connect', () => {
  caps.emit('join', 'general');
  caps.on('message', data => {
    if (data.action === 'pickup') {
      let id = data.payload.orderID;
      let payload = data.payload;
      setTimeout(() => {
        console.log(`Picking up ${id}`);
        caps.emit('join', data.payload.store);
        caps.emit('message', { action: 'in-transit', payload });
      }, 1000);
    } else if (data.action === 'thanks') {
      console.log(
        `Thank you for delivering ${data.payload.orderID}`,
      );
    }
    setTimeout(() => {
      console.log(`delivered ${data.payload.orderID}`);
      caps.emit('message', {action:'delivered',payload:data.payload});
      caps.emit('join', 'general');
    }, 3000);
  });
});


