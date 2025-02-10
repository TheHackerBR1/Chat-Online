const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let rooms = {};

io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    socket.on('joinRoom', ({ room, nickname }) => {
        socket.join(room);
        socket.nickname = nickname;

        if (!rooms[room]) {
            rooms[room] = [];
        }
        rooms[room].push(nickname);

        socket.to(room).emit('message', `${nickname} entrou na sala`);
    });

    socket.on('chatMessage', (msg, room) => {
        io.to(room).emit('message', `${socket.nickname}: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});