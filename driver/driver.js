'use strict';

const net = require('net');
const client = new net.Socket();

//Connect to the CAPS server
const host = 'localhost';
const port = 4000;
client.connect(port, host, () => {
  console.log(`Connected to ${host} : ${port}`);
});


// Listen for the data event coming in from the CAPS server
//When data arrives, parse it (it should be JSON) and look for the event property and begin processing…
client.on('data', function (data) {

  data  = JSON.parse(data);
  console.log('EVENT OBJECT PAYLOAD', data.event);
  //If the event is called pickup
  //Simulate picking up the package
  if (data.event === 'pickup') {

    let id = data.payload.orderID;
    let payload = data.payload;
    // WAIT 1 SECOND
    setTimeout(() => {
      // Log “picking up id” to the console
      console.log(`Picking up ${id}`);

      //Create a message object with the following keys:
      //event - ‘in-transit’
      //payload - the payload from the data object you just received
      let event = JSON.stringify({ event: 'in-transit', payload });

      //Write that message (as a string) to the CAPS server
      client.write(event);
    }, 1000);

    //Simulate delivering the package
    //Wait 3 seconds
    setTimeout(() => {
      let payload = data.payload;
      //Create a message object with the following keys:
      //event - ‘delivered’
      //payload - the payload from the data object you just received
      //Write that message (as a string) to the CAPS server
      console.log(`delivered ${payload.orderID}`);
      let message = JSON.stringify({ event: 'delivered', payload });

      client.write(message);
    }, 3000);
  }
});

// const emitter = require('../lib/events.js');

// // monitor pickup for event
// emitter.on('pickup', inTransitHandler);
// emitter.on('in-transit', deliveredHandler);