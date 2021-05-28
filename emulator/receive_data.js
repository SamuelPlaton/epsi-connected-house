#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const axios = require('axios')


amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'captor';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            jsonObject = JSON.parse(msg.content)
            id = jsonObject.id
            type = jsonObject.type
            state = jsonObject.state
            value = jsonObject.value


            axios.post('http://localhost:3000/detectors', {
                data : {
                id : jsonObject.id,
                type : jsonObject.type,
                state : jsonObject.state,
                value : jsonObject.value,
                }
            })
                .then(res => {
                    console.log(`statusCode: ${res.statusCode}`)
                    console.log(res)
                })
                .catch(error => {
                    console.error(error)
                })
        }, {
            noAck: true
        });
    });
});