#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

SendCaptor()
function SendCaptor () {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'captor';
            var id = getRandom(1, 6)
            var tabType = new Array("luminosity", "movement", "sound", "thermo");
            var type = tabType[getRandom(0, 3)]
            var tabState = new Array("on", "off");
            var state = tabState[getRandom(0, 1)]
            console.log(state)
            var value
            if (type == "luminosity") {
                value = getRandom(0, 100)
            }
            else if (type == "thermo") {
                value = getRandom(10, 40)
            }
            else {
                value = getRandom(0, 1)
            }
            var msg = {
                id: id,
                type: type,
                state: state,
                value: value
            };


            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

            console.log(" [x] Sent %s", msg);
        });
        setTimeout(function () {
            SendCaptor()
            /*connection.close();
            process.exit(0);*/

        }, 5000);
    });
}

function getRandom (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}