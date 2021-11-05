import React, { useState, useEffect } from 'react';

import './PlayerArea.css';
import Player from '../../atoms/Player/Player';

export default function PlayerArea (props) {

  const { cards, player } = props;

  return (
    <div className="player-area">
      <div className="player-area__player">
        <Player cards={cards} player={player} />
      </div>
      <div className="player-area__cards"></div>
    </div>
  );
}