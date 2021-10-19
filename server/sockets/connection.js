function disconnectHandler (socket) {
  console.log(`disconnection, socket.id (should be undefined): ${socket.id}`)
}

module.exports = {
  disconnectHandler
}