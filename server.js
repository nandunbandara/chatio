'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);

app.use(cors());

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (client)=>{
    client.on('join', (data)=>{
        console.log(data);
    })

    client.on('messages', (data)=>{
        console.log(data);
        client.emit('broad', data);
        client.broadcast.emit('broad', data);
    })
});

server.listen(process.env.PORT || 4200);