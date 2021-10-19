const { disconnectHandler } = require('./connection');

function registerSocketEventHandlers (socketServer) {
  // when there is a new connection, register handlers on the socket
  socketServer.on('connection', (socket) => {
    console.log(`client connection, socket.id: ${socket.id}`);
    socket.on('disconnect', disconnectHandler);
  });
}

module.exports = registerSocketEventHandlers;