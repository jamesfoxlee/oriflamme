import React, { useState, useEffect } from 'react';

import './OpponentArea.css';
import Player from '../../atoms/Player/Player';

export default function OpponentArea (props) {

  const { cards, opponents } = props;

  // TODO: set isActive prop if player is current active player (glow effect)

  return (
    <div className="opponent-area">
      {
        opponents.map((opponent, idx) => {
          return (
            <div className="opponent__wrapper">
              <Player
                cards={cards}
                key={`opponent-${idx}`}
                player={opponent}
              />
            </div>
          )
        })
      }
    </div>
  );
}