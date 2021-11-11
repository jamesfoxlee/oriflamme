import React, { useState, useEffect, useContext } from 'react';

import './Game.css';
import OpponentArea from '../../molecules/OpponentArea/OpponentArea';
import Queue from '../../organisms/Queue/Queue';
import PlayerArea from '../../molecules/PlayerArea/PlayerArea';
import Status from '../../molecules/Status/Status.js';
import Messages from '../../organisms/Messages/Messages';
import Loading from '../../atoms/Loading/Loading';

import { SOCKET_EVENTS } from '../../config/socket.constants';
import { UserContext } from '../../context/user.context';
import { CardsProvider } from '../../context/cards.context';

import { gameState as fixedGameState } from '../../mocks/gamestate.mocks';
import { cards } from '../../mocks/cards.mocks';
import { messages } from '../../mocks/messages.mocks';

const { GAME } = SOCKET_EVENTS;

export default function Game(props) {

  const { leaveRoom, roomId, socket } = props;

  // "METHODS"

  const onPlayerCardClicked = (card) => {
    setSelectedPlayerCard(card);
  }

  const onAddToQueue = () => {

  }

  useEffect(() => {

    // register listeners
    // socket.registerListener()

    return function teardownListeners() {
      // TODO: implement
      console.log('Game [UNMOUNT]: teardownListeners()');
    }
  }, [])

  // TODO: review this
  const [gameState, setGameState] = useState(fixedGameState);
  const [loading, setLoading] = useState(true);
  const [selectedPlayerCard, setSelectedPlayerCard] = useState(null);

  const [user] = useContext(UserContext);
  // const [messages, setMessages] = useState({});
  // TODO: reference main player by user
  // TODO: **IMPORTANT** revire everything below, likely temporary!!
  const { players, queue } = gameState;
  const opponents = players.slice(0, players.length - 1);
  const player = players[players.length - 1];

  return (
    <div className="game">
      {
        loading ?
        <Loading message={"Starting game..."} /> :
        <CardsProvider value={[cards, onPlayerCardClicked]} >
          <div className="game__table">
            <div className="game__opponents">
              <OpponentArea
                cards={cards}
                gameState={gameState}
                opponents={opponents}
              />
            </div>
            <div className="game__queue">
              <Queue
                gameState={gameState}
                selectedPlayerCard={selectedPlayerCard}
              />
            </div>
            <div className="game__player">
              <PlayerArea
                cards={cards}
                gameState={gameState}
                player={player}
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
                players={players}
                socket={socket}
              />
            </div>
          </div>
        </CardsProvider>
      }
    </div>
  );
}

