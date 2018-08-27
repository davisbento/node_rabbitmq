var amqp = require('amqplib/callback_api');

var data = [
  { id: 1, name: 'davi' },
  { id: 2, name: 'david 2' },
  { id: 3, name: 'david 3' },
]

amqp.connect('amqp://localhost:5672', function (err, conn) {
  conn.createChannel(function (err, ch) {
    if (err) {
      return console.log(err);
    }
    setInterval(function() {
      for(var reg in data) {
        var q = 'data'; // queue name
  
        var dataToSend = JSON.stringify(data[reg]) // data to send to worker
        
        ch.assertQueue(q, { durable: false });
        ch.sendToQueue(q, new Buffer(dataToSend));
  
        console.log(" [x] Sent %s", dataToSend);
      }
    }, 2000);
  });
  // setTimeout(function () { conn.close(); process.exit(0) }, 500);
});