import React from 'react';

import './Round.css';

export type Props = { round: number }

export default function Round (props: Props) {

  const { round } = props;

  const roundText = round === 6 ? 'Final Round' : `Round ${round}`;

  return (
    <div className="round">
      <div className="round__text">{roundText}</div>
    </div>
  );
}