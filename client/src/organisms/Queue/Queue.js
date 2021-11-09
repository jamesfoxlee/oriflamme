import React, { useState, useEffect } from 'react';

import './Queue.css';
import QueueCard from '../QueueCard/QueueCard';

export default function Queue (props) {

  const { gameState, selectedPlayerCard } = props;
  const { phase, queue, queueResolutionIndex } = gameState;

  return (
    <div className="queue">
      <div className="queue__endzone">
        {
          selectedPlayerCard ?
            <span className="queue__arrow icon-arrow-left"/> :
            null
        }
      </div>
      {
        queue.length ?
          <div className="queue__cards">
            {
              queue.map((stack, idx) => {
                const topCard = stack[stack.length - 1];
                const isResolving = queueResolutionIndex === idx;
                return (
                  <QueueCard
                    card={topCard}
                    isResolving={isResolving}
                    key={`player-hand-card-${idx}`}
                    scaleFactor={2}
                    width={70}
                  />
                )
              })
            }
          </div> :
          <div>NO CARDS</div>
      }
      <div className="queue__endzone">
        {
          selectedPlayerCard ?
            <span className="queue__arrow icon-arrow-right"/> :
            null
        }
      </div>
    </div>
  );
}