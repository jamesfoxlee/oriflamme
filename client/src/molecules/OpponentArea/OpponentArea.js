import React, { useContext } from 'react';

import './OpponentArea.css';
import Player from '../Player/Player';

import { UserContext } from '../../context/user.context';

export default function OpponentArea (props) {

  const { gameState } = props;
  const { players, turnOrder } = gameState;
  const [user] = useContext(UserContext);

  // obtain a list of players for rendering the UI
  // user at bottom, player after in turn order will be top left
  const userIdx = turnOrder.indexOf(user.id);
  const opponentOrder = turnOrder.slice(userIdx + 1).concat(turnOrder.slice(0, userIdx));
  const opponents = opponentOrder.map(opponentId => {
    return players.find(player => player.id === opponentId);
  });

  // TODO: set isActive prop if player is current active player (glow effect)

  return (
    <div className="opponent-area">
      {
        opponents.map((opponent, idx) => {
          return (
            <div className="opponent__wrapper" key={`opponent-${idx}`}>
              <Player
                player={opponent}
              />
            </div>
          )
        })
      }
    </div>
  );
}