import React from 'react';

import './Status.css';

import { PHASES } from '../../config/game.constants';

const boxStyles = {
  backgroundColor: 'var(--color-white)',
  boxShadow: '0 0 1.6rem 1.6rem var(--color-white)',
  color: 'hsla(213, 62%, 15%, 1)',
}

export default function Status(props) {

  const { gameState, selectedPlayerCard, user } = props;
  const { activePlayerId, phase, players, queue, queueResolutionIndex:qri } = gameState;

  const activePlayer = players[activePlayerId];
  const playerIsActive = activePlayerId === user.id;
  const phaseText = `${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase `;
  const playerName = playerIsActive ? 'you' : activePlayer.name;

  let resolvingCard;
  try {
    const resolvingStack = queue[qri];
    resolvingCard = resolvingStack[resolvingStack.length - 1];
  } catch (err) {
    resolvingCard = null;
  }

  return (
    <div className="status">
      <div className="status__inner">
        <div className="status__phase">{phaseText}</div>
        {
          phase === PHASES.PLANNING && !playerIsActive ?
            <div className="status__message">
              {`Waiting for ${playerName} to play a card...`}
            </div> :
            null
        }
        {
          phase === PHASES.PLANNING && playerIsActive && !selectedPlayerCard ?
            <div className="status__message" style={playerIsActive ? boxStyles : null}>
              {`Select a card to play to either end of the Queue.`}
            </div> :
            null
        }
        {
          phase === PHASES.PLANNING && playerIsActive && selectedPlayerCard ?
            <div className="status__message" style={playerIsActive ? boxStyles : null}>
              {`Play ${selectedPlayerCard.name} to either end of the Queue, or select another card.`}
            </div> :
            null
        }
        {
          phase === PHASES.RESOLUTION && !playerIsActive && resolvingCard && !resolvingCard.revealed?
            <div className="status__message">
              {`Waiting for ${playerName} to choose whether to reveal the current card...`}
            </div> :
            null
        }
        {
          phase === PHASES.RESOLUTION && !playerIsActive && resolvingCard && resolvingCard.revealed?
            <div className="status__message">
              {`Waiting for ${playerName} to resolve the effect of ${resolvingCard.name}...`}
            </div> :
            null
        }
        {
          phase === PHASES.RESOLUTION && playerIsActive && resolvingCard && !resolvingCard.revealed?
            <div className="status__message" style={playerIsActive ? boxStyles : null}>
              {`Reveal ${resolvingCard.name} to apply its effect, or place 1 influence on it.`}
            </div> :
            null
        }
        {
          phase === PHASES.RESOLUTION && playerIsActive && resolvingCard && resolvingCard.revealed?
            <div className="status__message" style={playerIsActive ? boxStyles : null}>
              {`Choose targets for ${resolvingCard.name}.`}
            </div> :
            null
        }
      </div>
    </div>
  );
}