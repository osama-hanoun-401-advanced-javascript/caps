'use strict';

const emitter = require('../lib/events.js');

// monitor pickup for event
emitter.on('pickup', inTransitHandler);
emitter.on('in-transit', deliveredHandler);

function inTransitHandler(order){

  // WAIT 1 SECOND
  setTimeout(() => {

    console.log(`DRIVER: picked up ${order.orderID}`);
    //Log “DRIVER: picked up [ORDER_ID]” to the console.
    //Emit an ‘in-transit’ event with the payload you received

    emitter.emit('in-transit', order);
  }, 1000);

}



function deliveredHandler(delivery) {
  // AFTER 3 SECONDS
  setTimeout(() => {

    //Log “delivered” to the console
    //Emit a ‘delivered’ event with the same payload
    console.log(`DRIVER: delivered ${delivery.orderID}`);
    emitter.emit('delivered', delivery); 
  }, 5000);
}

