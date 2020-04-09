var express = require('express');
var router = express.Router();
const {getWeatherData, sendWeatherData} = require('./function.js');
const RabbitmqWrapper = require('./rabbitmq.js');
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://ksh:1234@3.34.5.103', (error0, connection)=>{
  if(error0){throw error0;}
  connection.createChannel((error1, channel)=>{
    if(error1) {throw error1};
    const queue = 'req/weather/Info/general';
    
    channel.assertQueue(queue, {
      durable: false
    });

    console.log('[*] Waiting for messages in %s.', queue);

    channel.consume(queue, async (msg)=>{
        const value = msg.content.toString();
        console.log('[x] Received %s', value);
        const data = await getWeatherData();
        // console.log(data);
        sendWeatherData(data);
    }, {noAck:true});
  });
});

module.exports = router;
