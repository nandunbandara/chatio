'use strict';

const express = require('express');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(4200);