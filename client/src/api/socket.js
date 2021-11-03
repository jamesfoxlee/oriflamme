import io from 'socket.io-client';

export default function Socket() {

  function registerListener (event, handler) {
    console.log(`Socket.registerListener() event: ${event}`);
    socket.on(event, handler);
  }

  function unregisterListener (event) {
    console.log(`Socket.unregisterListener() event: ${event}`);
    socket.removeAllListeners(event);
  }

  function getRooms () {
    console.log(`Socket.getRooms()`);
    socket.emit('rooms-get');
  }

  function createRoom () {
    console.log(`Socket.createRoom()`);
    // socket.emit('rooms-get');
  }

  function sendMessage (message) {
    console.log(`Socket.sendMessage() message: ${message}`);
    socket.emit('message-send', message);
  }

  //----------------------------------------------------------------
  // INITIALISE SOCKET
  //----------------------------------------------------------------

  const socket = io('http://localhost:19126');

  socket.on('connect', () => {
    console.log(`Socket() connected to server, socket.id: ${socket.id}`)
  });
  socket.on('disconnect', () => {
    console.log(`Socket() disconnected from server`)
  });

  return {
    registerListener,
    unregisterListener,
    getRooms,
    sendMessage
  };
}