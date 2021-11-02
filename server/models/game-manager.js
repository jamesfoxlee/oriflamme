const { v1: uuidv1 } = require('uuid');

module.exports = function GameManager () {
  const _games = {};

  const _getNumberOfGames = () => Object.keys(_games).length;

  const _createGame = (gameId) => {
    _games[gameId] = {
      numSockets: 0,
      sockets: {},
    };
    return gameId;
  };

  const addToGame = (socket, id) => {
    // TODO: limit adding if > 5 players
    const gameId = id || Object.keys(_games)[0] || uuidv1();
    console.log(`addToGame() adding socket to room with gameId: ${gameId}`);
    if (!_games[gameId]) {
      _createGame(gameId);
      console.log('games running: ', _getNumberOfGames());
    }
    const game = _games[gameId];
    game.sockets[socket.id] = socket;
    socket.join(gameId);
    game.numSockets += 1;
    console.log(`number of sockets now in game: ${game.numSockets}`);
  };

  const removeFromGame = (socket) => {
    console.log(`removeFromGame() for socket.id: ${socket.id}`);
    for (let gameId of socket.rooms) {
      if (gameId !== socket.id) {
        const game = _games[gameId];
        if (game.numSockets === 1) {
          delete _games[gameId];
          console.log('games running: ', _getNumberOfGames());
        } else {
          delete game.sockets[socket.id];
          game.numSockets -= 1;
          console.log(`number of sockets in game: ${game.numSockets}`);
        }
      }
    }
  }

  return {
    addToGame,
    removeFromGame
  }
};