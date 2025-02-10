const socket = io();
const loginDiv = document.getElementById('login');
const chatDiv = document.getElementById('chat');
const messagesDiv = document.getElementById('messages');
const nicknameInput = document.getElementById('nickname');
const roomInput = document.getElementById('room');
const msgInput = document.getElementById('msg');

document.getElementById('joinBtn').onclick = () => {
    const nickname = nicknameInput.value;
    const room = roomInput.value;
    socket.emit('joinRoom', { room, nickname });
    loginDiv.style.display = 'none';
    chatDiv.style.display = 'block';
};

document.getElementById('sendBtn').onclick = () => {
    const msg = msgInput.value;
    const room = roomInput.value;
    socket.emit('chatMessage', msg, room);
    msgInput.value = '';
};

socket.on('message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messagesDiv.appendChild(messageElement);
});