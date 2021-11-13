import React from 'react';

import './PlayerHand.css';
import PlayerCard from '../PlayerCard/PlayerCard';

export default function PlayerHand(props) {

  const { cardColor, hand, isActive } = props;

  return (
    <div className="player-hand">
      {
        hand.map((cardId, idx) => {
          return (
            <PlayerCard
              canPlayCard={isActive}
              cardColor={cardColor}
              cardId={cardId}
              key={`player-hand-card-${idx}`}
            />
          )
        })
      }
    </div>
  );
}