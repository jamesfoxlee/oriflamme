import React, { useState, useEffect, useContext } from 'react';

import './Game.css';
import OpponentArea from '../../molecules/OpponentArea/OpponentArea';
import PlayerArea from '../../molecules/PlayerArea/PlayerArea';
import Messages from '../../organisms/Messages/Messages';

import SOCKET_CONSTANTS from '../../config/socket.constants';
import { UserContext } from '../../context/user.context';
import { CardsProvider } from '../../context/cards.context';
import { cards, gameState, messages } from '../../services/mocks.service';

const { GAME } =  SOCKET_CONSTANTS.EVENTS;
// TODO: take into state
const { players, queue } = gameState;

export default function Game (props) {

  const { leaveRoom, roomId, socket} = props;

  useEffect(() => {

    // register listeners
    // socket.registerListener()

    return function teardownListeners () {
      console.log('Game [UNMOUNT]: teardownListeners()');
    }
  }, [])

  const [user] = useContext(UserContext);
  // TODO: cards context vs prop drilling
  // const [cards, setCards] = useState({});
  // const [gameState, setGameState] = useState({});
  // const [messages, setMessages] = useState({});

  // TODO: reference mian player by user
  const opponents = players.slice(0, players.length - 1);
  const player = players[players.length - 1];

  return (
    <div className="game">
      <CardsProvider value={cards} >
        <div className="game__table">
          <div className="game__opponents">
            <OpponentArea cards={cards} opponents={opponents} />
          </div>
          <div className="game__queue">
            QUEUE
          </div>
          <div className="game__player">
            <PlayerArea cards={cards} player={player} />
          </div>
        </div>
        <div className="game__sidebar">
          <div className="game__messages">
            <Messages
              messages={messages}
              players={players}
              socket={socket}
            />
          </div>
        </div>
      </CardsProvider>
    </div>
  );
}

