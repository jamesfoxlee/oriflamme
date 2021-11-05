import React, { useState, useEffect, useContext } from 'react';

import './Game.css';
import OpponentArea from '../../molecules/OpponentArea/OpponentArea';
import PlayerArea from '../../molecules/PlayerArea/PlayerArea';
import Messages from '../../organisms/Messages/Messages';

import SOCKET_CONSTANTS from '../../config/socket.constants';
import { UserContext } from '../../context/user.context';
import { cards, players, messageHistory } from '../../services/mocks.service';

const { GAME } =  SOCKET_CONSTANTS.EVENTS;

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
  // const [players, setPlayers] = useState({});

  return (
    <div className="game">
      <div className="game__table">
        <div className="game__opponents">
          <OpponentArea players={players} />
        </div>
        <div className="game__queue"> QUEUE</div>
        <div className="game__player">
          <PlayerArea cards={cards} />
        </div>
      </div>
      <div className="game__sidebar">
        <div className="game__messages">
          <Messages
            messages={messageHistory}
            players={players}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
}

