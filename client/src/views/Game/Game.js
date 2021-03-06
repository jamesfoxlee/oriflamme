import React, { useState, useEffect, useContext } from 'react';

import './Game.css';
import OpponentArea from '../../molecules/OpponentArea/OpponentArea';
import Queue from '../../organisms/Queue/Queue';
import PlayerArea from '../../molecules/PlayerArea/PlayerArea';
import Messages from '../../organisms/Messages/Messages';
import Round from '../../atoms/Round/Round';
import Status from '../../atoms/Status/Status.js';
import Loading from '../../atoms/Loading/Loading';

import { SOCKET_EVENTS } from '../../config/socket.constants';
import { SocketContext } from '../../context/socket.context';
import { UserContext } from '../../context/user.context';
import { CardsProvider } from '../../context/cards.context';
// TODO: remove cards to server?
import { CARDS as cards } from '../../config/cards.constants';

const { LOBBY, GAME } = SOCKET_EVENTS;

export default function Game(props) {

  // const { activeRoomId, leaveRoom } = props;

  // "METHODS"

  const handleGameStateChanged = (newGameState) => {
    console.log('EVENT RECEIVED: ', GAME.GAMESTATE_CHANGED);
    setGameState(newGameState);
    console.log(newGameState);
    if (loading) {
      setLoading(false);
    }
  }

  const handlePlayerCardClicked = (card) => {
    // set to null to deselect if same card clicked
    let val = card;
    if (selectedPlayerCard) {
      val = selectedPlayerCard.id === card.id ? null : val;
    }
    setSelectedPlayerCard(val);
  }

  // STATE, CONTEXT etc

  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState(null);
  // TODO: review this, implement messages
  const [messages, setMessages] = useState([]);
  const [selectedPlayerCard, setSelectedPlayerCard] = useState(null);

  const socket = useContext(SocketContext);
  const [user] = useContext(UserContext);

  useEffect(() => {

    // socket.registerListener(GAME.ROUND_START, handleRoundStart);
    // TODO: change to cleanup useEffect to unregister listener
    socket.registerListener(GAME.GAMESTATE_CHANGED, handleGameStateChanged);
    socket.registerOneShotListener(LOBBY.GAME_STARTED, () => {
      socket.getGameState();
    });

    return function teardownListeners() {
      // TODO: all the others
      socket.unregisterListeners(GAME.GAMESTATE_CHANGED);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="game">
      {
        loading ?
          <Loading message={"Starting game..."} /> :
          null
      }
      {
        !loading && gameState ?
          <CardsProvider value={[cards, selectedPlayerCard, handlePlayerCardClicked]} >
            <div className="game__table">
              <div className="game__top-bar">
                <Round round={gameState.round} />
                <OpponentArea
                  activePlayerId={gameState.activePlayerId}
                  players={gameState.players}
                  turnOrder={gameState.turnOrder}
                />
              </div>
              <div className="game__queue">
                <Queue
                  gameState={gameState}
                  selectedPlayerCard={selectedPlayerCard}
                  setSelectedPlayerCard={setSelectedPlayerCard}
                />
              </div>
              <div className="game__bottom-bar">
                <PlayerArea
                  activePlayerId={gameState.activePlayerId}
                  phase={gameState.phase}
                  players={gameState.players}
                />
              </div>
            </div>
            <div className="game__sidebar">
              <div className="game__status">
                <Status
                  gameState={gameState}
                  selectedPlayerCard={selectedPlayerCard}
                  user={user}
                />
              </div>
              <div className="game__messages">
                <Messages
                  messages={messages}
                  players={gameState.players}
                  socket={socket}
                />
              </div>
            </div>
          </CardsProvider> :
          null
      }
    </div>
  );
}

