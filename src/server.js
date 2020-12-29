require('dotenv').config();
const cors = require('cors');
const express = require('express');
const routes = require('./routes/index');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

io.listen(3334);

const messages = [
  {
    id: 11,
    message: 'Oi, gente',
    user: 'Larica'
  },
  {
    id: 22,
    message: 'Olá',
    user: 'Thayann'
  },
  {
    id: 44,
    message: 'Oi, Lari',
    user: 'Banana'
  },
];

io.on('connection', socket => {
  console.log(`user connected ${socket.id}`);

  socket.emit('connection', messages);

  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('newMessages', data);
  })

  socket.on('disconnect', () => console.log(`user disconnected ${socket.id}`));
});

app.listen(process.env.APP_PORT, 
  () => console.log(`Server started at port ${process.env.APP_PORT}`)
);
