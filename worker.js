var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err, conn) {
  conn.createChannel(function (err, ch) {
    if (err) {
      return console.log('worker err:', err);
    }

    var q = 'data'; // queue name

    ch.assertQueue(q, { durable: false });
    ch.prefetch(1);

    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", q);
    
    ch.consume(q, function (msg) {
      console.log("[x] Received %s", msg.content.toString('utf8'));
    }, { noAck: true });
  });
});