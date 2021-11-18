import React from 'react';
import { Props } from './Props';
import './Status.css';

import { PHASES } from '../../config/game.constants';

const boxStyles = {
  backgroundColor: 'var(--color-white)',
  boxShadow: '0 0 1.6rem 1.6rem var(--color-white)',
  color: 'hsla(213, 62%, 15%, 1)',
}



export default function Status(props: Props) {

  const { gameState, selectedPlayerCard, user } = props;
  const {
    abilityInterrupt,
    activePlayerId,
    phase,
    players,
    queue,
    queueResolutionIndex: qri,
    resolvingCardToBeDiscarded,
    targetsNoneValid,
  } = gameState;

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

  let statusMessage;
  if (phase === PHASES.PLANNING) {

    // OTHER PLAYER'S TURN

    if (!playerIsActive) {
      statusMessage = `Waiting for ${playerName} to play a card...`;
    }

    // PLAYER IS ACTIVE

    if (playerIsActive && !selectedPlayerCard ) {
      statusMessage =  'Select a card to play to either end of the Queue.';
    }
    if (playerIsActive && selectedPlayerCard) {
      statusMessage = `Play ${selectedPlayerCard.name} to either end of the Queue, or select another card.`;
    }
  }
  else if (phase === PHASES.RESOLUTION) {

    // OTHER PLAYER'S TURN

    if (!playerIsActive && resolvingCard && !resolvingCard.revealed) {
      statusMessage = `Waiting for ${playerName} to choose whether to reveal the current card...`;
    }

    if (!playerIsActive && resolvingCard && resolvingCard.revealed) {
      statusMessage = `Waiting for ${playerName} to resolve the effect of ${resolvingCard.name}...`;
    }

    // PLAYER IS ACTIVE

    if (playerIsActive && resolvingCard && !resolvingCard.revealed) {
      statusMessage = `Reveal ${resolvingCard.name} to apply its effect, or place 1 influence on it.`;
    }

    if (playerIsActive && resolvingCard && resolvingCard.revealed) {

      if (abilityInterrupt) {
        statusMessage = `Elimination interrupted by ${resolvingCard.name}. Click Confirm to continue.`;
      }
      else if (resolvingCardToBeDiscarded) {
        statusMessage = `${resolvingCard.name} will now be discarded. Click Discard to continue.`;
      }
      else if (targetsNoneValid) {
        statusMessage = `No valid targets for ${resolvingCard.name}. Click Confirm to continue.`;
      }
      else if (resolvingCard.id === 'heir' || resolvingCard.id === 'lord') {
        statusMessage = `${resolvingCard.name} may now gain additional influence. Click Confirm to continue.`;
      }
      else {
        statusMessage = `Choose targets for ${resolvingCard.name}.`;
      }
    }
  }

  return (
    <div className="status">
      <div className="status__inner">
        <div className="status__phase">{phaseText}</div>
          <div className="status__message" style={playerIsActive ? boxStyles : undefined}>
            {statusMessage}
          </div>
      </div>
    </div>
  );
}