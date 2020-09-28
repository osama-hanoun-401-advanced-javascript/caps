'use strict';

var faker = require('faker');
const emitter = require('../lib/events.js');

/*
Declare your store name (perhaps in a .env file, so that this module is re-usable)
Every 5 seconds, simulate a new customer order
Create a fake order, as an object:
storeName, orderId, customerName, address
Emit a ‘pickup’ event and attach the fake order as payload
HINT: Have some fun by using the faker library to make up phony information
Monitor the system for events …


*/
let storeName = '1-206-flowers';


function start(){
  setInterval(() => {
    const order = {
      time: faker.date.recent(),
      store: storeName,
      orderID: faker.random.number(),
      customer: `${faker.name.firstName()},${faker.name.lastName()}`,
      address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.stateAbbr()}`,
    };
    emitter.emit('pickup', order);
    console.log(order);
  }, 5000);
}

start();


// }
//Whenever the ‘delivered’ event occurs
//Log “thank you” to the console
emitter.on('delivered', (payload) => {
  console.log(
    `VENDOR: Thank you for delivering ${payload.orderID}`,
  );
});

module.exports = { start };