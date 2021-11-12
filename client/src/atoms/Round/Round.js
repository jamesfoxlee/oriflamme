import React from 'react';

import './Round.css';

export default function Round (props) {

  const { round } = props;

  const roundText = round === 6 ? 'Final Round' : `Round ${round}`;

  return (
    <div className="round">
      <div className="round__text">{roundText}</div>
    </div>
  );
}