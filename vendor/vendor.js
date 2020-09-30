'use strict';
var faker = require('faker');
const io = require('socket.io-client');
const inquirer = require('inquirer');
const caps = io.connect('http://localhost:3000/caps');

async function getName() {
  console.clear();
  const input = await inquirer.prompt([{
    name: 'name', message: 'What is your shop name? '
  }]);
  return input.name;
}


caps.on('connect', async () => {

  let name = await getName();

  // caps.emit('join', name);
  caps.emit('join', 'general');

  caps.on('message', data => {
    if (data.action === 'delivered') {
      console.log(
        `Thank you for delivering ${data.payload.orderID}`
      )
      caps.emit('message', {action : 'thanks', payload:data.payload })
    } else if (data.action === 'in-transit'){
      console.log(
        `in-transit ${data.payload.orderID}`
      )
    }
  });

   getInput();
  async function getInput() {
    let order = await {
      time: faker.date.recent(),
      store: name,
      orderID: faker.random.number(),
      customer: `${faker.name.firstName()},${faker.name.lastName()}`,
      address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.stateAbbr()}`,
    };
     caps.emit('message',{payload:order,action:'pickup'});

    setInterval(async() => {
        getInput();
    }, 3000);
  }
});
