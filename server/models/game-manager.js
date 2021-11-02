const { v1: uuidv1 } = require('uuid');

module.exports = function GameManager () {
  const _games = {};
  return {
    createGame: function (id) {
      _games[id] = {
        numSockets: 0,
        sockets: {},
      };
      return id;
    },
    addToGame: function (socket, id) {
      // TODO: limit adding if > 5 players
      const gameId = id || Object.keys(_games)[0] || uuidv1();
      console.log(`addToGame() adding socket to room with gameId: ${gameId}`);
      if (!_games[gameId]) {
        this.createGame(gameId);
      }
      const game = _games[gameId];
      game.sockets[socket.id] = socket;
      game.numSockets += 1;
      console.log(`number of sockets in game: ${game.numSockets}`);
      socket.join(gameId);
      console.log(socket.rooms)
    }
  }
};