const express = require('express');
const socket = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port);

app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('chat', data => {
        io.sockets.emit('chat',data)
    })

    socket.on('typing', data => {
    socket.broadcast.emit('typing',data)
})
})