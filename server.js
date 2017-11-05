'use strict';

const express = require('express');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (client)=>{
    client.on('join', (data)=>{
        console.log(data);
    })
});

server.listen(process.env.PORT || 4200);