import React from 'react';

import './Queue.css';
import QueueCard from '../QueueCard/QueueCard';
import EmptyQueue from '../../atoms/EmptyQueue/EmptyQueue';

import { PHASES } from '../../config/game.constants';

export default function Queue (props) {

  const { gameState, selectedPlayerCard } = props;
  const { phase, queue, queueResolutionIndex } = gameState;

  return (
    <div className="queue">
      <div className="queue__endzone queue__endzone--left">
        {
          selectedPlayerCard ?
            <span className="queue__arrow icon-arrow-left"/> :
            null
        }
      </div>
      <div className="queue__centrezone">
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
                    />
                  )
                })
              }
            </div> :
            <EmptyQueue />
        }
      </div>
      <div className="queue__endzone queue__endzone--right">
        {
          selectedPlayerCard ?
            <span className="queue__arrow icon-arrow-right"/> :
            null
        }
      </div>
    </div>
  );
}