import React from 'react';

import './PlayerHand.css';
import Card from '../../organisms/Card/Card';

export default function PlayerHand(props) {

  const { cardColor, isPlayerTurn } = props;
  // TODO: add 'hand' to destructuring once shuffling etc implemented, remove line below
  const hand = props.hand.slice(0,7)

  return (
    <div className="player-hand">
      {
        hand.map((cardId, idx) => {
          return (
            <Card
              canPlayCard={isPlayerTurn}
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