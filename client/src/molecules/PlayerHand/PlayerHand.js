import React from 'react';

import './PlayerHand.css';
import PlayerCard from '../../organisms/PlayerCard/PlayerCard';

export default function PlayerHand(props) {

  const { cardColor, handIsActive } = props;
  // TODO: add 'hand' to destructuring once shuffling etc implemented, remove line below
  const hand = props.hand.slice(0,7)

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