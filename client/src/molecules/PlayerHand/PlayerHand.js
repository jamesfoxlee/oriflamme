import React from 'react';

import './PlayerHand.css';
import PlayerCard from '../../organisms/PlayerCard/PlayerCard';

export default function PlayerHand(props) {

  const { cardColor, hand, handIsActive } = props;

  return (
    <div className="player-hand">
      {
        hand.map((cardId, idx) => {
          return (
            <PlayerCard
              canPlayCard={handIsActive}
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