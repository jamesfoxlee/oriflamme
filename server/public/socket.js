console.log('initialising socket');
const socket = io();

socket.on('connect', () => {
  console.log(`connected to server, socket.id: ${socket.id}`);
});

socket.on('disconnect', () => {
  console.log(`disconnected from server, socket.id (should be undefined): ${socket.id}`);
});

export { socket };