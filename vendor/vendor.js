'use strict';

const net = require('net');
const socket = net.Socket();
const faker = require('faker');

const client = new net.Socket();

//Connect to the CAPS server
const host = 'localhost';
const port = 4000;

client.connect(port, host, () => {
  console.log(`Connected to ${host} : ${port}`);
});


//Every 5 seconds, simulate a new customer order
// let storeName = '1-206-flowers';
setInterval(() => {
//Create an order object with your store name, order id, customer name, address
//HINT: Have some fun by using the faker library to make up phony information

  const order = {
    time: faker.date.recent(),
    store: process.env.STORE_NAME,
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()},${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.stateAbbr()}`,
  };

  //Create a message object with the following keys:
  //event - ‘pickup’
  //payload - the order object you created in the above step
  let event = (JSON.stringify({ event: 'pickup', payload: order }));
  //Write that message (as a string) to the CAPS server
  client.write(event);

}, 5000);

//Listen for the data event coming in from the CAPS server
//When data arrives, parse it (it should be JSON) and look for the event property
client.on('data', function (data) {
  let jsonPayload = JSON.parse(data);
  //Whenever the ‘delivered’ event occurs
  //Log “thank you” to the console
  if (jsonPayload.event === 'delivered') {
    console.log(
      `Thank you for delivering ${jsonPayload.payload.orderID}`
    )
    //Ignore any data that specifies a different event
  };
})

socket.on('data', (payload) => {
  let stringPayload = Buffer.from(payload).toString();
  const jsonPayload = JSON.parse(stringPayload);
})

// }