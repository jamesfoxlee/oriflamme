function socketDisconnecting (reason) {
  // TODO: just tested reason, need to tidy RoomManager on disconnect
  // can't do it without the socket, which isn't passed in!
  console.log(`disconnecting, reason: ${reason}`);
}

function socketDisconnect (socket) {
  console.log(`disconnection, socket.id (should be undefined): ${socket.id}`);
}

module.exports = {
  socketDisconnecting,
  socketDisconnect
}