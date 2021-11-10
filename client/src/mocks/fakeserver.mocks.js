import { gameState as INITIAL_GAME_STATE } from './gamestate.mocks';
import { cards } from './cards.mocks';
import { messages } from './messages.mocks';

function FakeServer (socket) {

  let _gameState = INITIAL_GAME_STATE;
  const _handlers = {

  };

  function receiveClientEvent (clientEvent, clientCallback) {
    console.log(`FakeServer.receiveClientEvent() ${clientEvent}`);
    _gameState = _handlers[clientEvent]();
  }

  function emit (event) {
    server
  }

  function receiveEvent (event) {

  }

  return {

  }
}