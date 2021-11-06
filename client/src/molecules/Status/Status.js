import React, { useState, useEffect } from 'react';

import './Status.css';

const boxStyles = {
  backgroundColor: 'var(--color-white)',
  color: 'hsla(213, 62%, 15%, 1)',
  boxShadow: '0 0 2rem 2rem var(--color-white)',
}

export default function Status (props) {

  const { gameState, selectedPlayerCard, user } = props;
  const { phase, players, round, turnOrder } = gameState;

  const activePlayer = players.find(player => player.id === turnOrder[0]);
  const playerIsActive = activePlayer.id === user.id;
  const phaseText = `${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase `;
  const playerName = playerIsActive ? 'you' : activePlayer.name;

  return (
    <div className="status">
      <div className="status__phase">{phaseText}</div>
      {
        phase === 'planning' && !playerIsActive  ?
        <div className="status__message">
          {`Waiting for ${playerName} to play a card`}
        </div> :
        null
      }
            {
        phase === 'planning' && playerIsActive && !selectedPlayerCard ?
        <div className="status__message" style={playerIsActive ? boxStyles : null}>
          {`Select a card to play to either end of the Queue.`}
        </div> :
        null
      }
      {
        phase === 'planning' && playerIsActive && selectedPlayerCard ?
        <div className="status__message" style={playerIsActive ? boxStyles : null}>
          {`Play ${selectedPlayerCard.name} to either end of the Queue, or select another card.`}
        </div> :
        null
      }
    </div>
  );
}