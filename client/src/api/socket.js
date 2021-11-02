import io from 'socket.io-client';

export default function Socket() {

  console.log('Socket.init() initialising socket...');
  const socket = io('http://localhost:19126');
  socket.on('connect', () => {
    console.log(`connected to server, socket.id: ${socket.id}`);
  });
  socket.on('disconnect', () => {
    console.log(`disconnected from server, socket.id (should be undefined): ${socket.id}`);
  });

  const sendMessage = (message) => {
    socket.emit('message')
  }

  return {
    sendMessage,
  }
}