import React, { useState, useEffect } from 'react';

import './Queue.css';
import QueueCard from '../QueueCard/QueueCard';

import { PHASES } from '../../config/game.constants';

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
                const isResolving = phase === PHASES.RESOLUTION &&
                                    queueResolutionIndex === idx;
                return (
                  <QueueCard
                    card={topCard}
                    isResolving={isResolving}
                    key={`queue-card-${idx}`}
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