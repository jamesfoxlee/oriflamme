import React from 'react';

import './PlayerArea.css';
import PlayerHand from '../../molecules/PlayerHand/PlayerHand';
import Player from '../../atoms/Player/Player';

export default function PlayerArea (props) {

  const { cards, player } = props;

  return (
    <div className="player-area">
      <div className="player-area__player">
        <Player cards={cards} player={player} />
      </div>
      <div className="player-area__hand">
        <PlayerHand cardColor={player.color} hand={player.hand} isPlayerTurn={true} />
      </div>
    </div>
  );
}