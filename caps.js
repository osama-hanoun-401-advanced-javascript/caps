'use strict';

const events = require("./lib/events");


events.on('save', handleSave);
events.on('pickup', payload => logIt('pickup', payload));
events.on('in-transit', payload => logIt('in-transit', payload));
events.on('delivered', payload => logIt('delivered', payload));

// SAVES PAYLOAD ID
function handleSave(payload){
  console.log(`Record ${payload.id} was saved`);
  events.emit('cache-update', {id:payload.id});
}

// GIVES TIMESTAMP TO PAYLOAD 
function logIt(event, payload) {
  let time= new Date();
  console.log("EVENT", {time, event, payload});
}
