import React, { useState, useEffect } from 'react';

import './OpponentArea.css';
import Player from '../../atoms/Player/Player';

import { players } from '../../services/mocks.service';

export default function OpponentArea (props) {

  // TODO: set isActive prop if player is current active player (glow effect)

  return (
    <div className="opponent-area">
      {
        players.map((player, idx) => {
          return (
            <div className="opponent__wrapper">
              <Player
                key={`opponent-${idx}`}
                player={player}
              />
            </div>
          )
        })
      }
    </div>
  );
}