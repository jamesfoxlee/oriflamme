import React from 'react';

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
            <div className="opponent__wrapper" key={`opponent-${idx}`}>
              <Player
                cards={cards}
                player={opponent}
              />
            </div>
          )
        })
      }
    </div>
  );
}