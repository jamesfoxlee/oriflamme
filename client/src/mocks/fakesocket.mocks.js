import FakeServer from './fakeserver.mocks.js';

function FakeGameSocket (server) {

  const _gameState = INITIAL_GAME_STATE;
  const _handlers = {};

  function on (event, handler) {
    _handlers[event] = handler;
  }

  function emit (clientEvent) {
    server.receiveClientEvent(clientEvent, (serverEvent, data) => {
      _handlers[serverEvent](data);
    });
  }

  function getRooms () {
    console.log(LOBBY.GET_ROOMS);
    socket.emit(LOBBY.GET_ROOMS);
  }
  // return an object with methods that emit/listen
}

const fakeServer = FakeServer();
const fakeSocket = FakeGameSocket(fakeServer);

export default fakeSocket;