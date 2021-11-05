import React, { useState, useEffect } from 'react';

import './Queue.css';

export default function Queue (props) {

  const { selectedPlayerCard } = props;

  return (
    <div className="queue">
      {
        selectedPlayerCard ?
          <div className="queue__endzone">
            <span className="queue__arrow icon-arrow-big-left"/>
          </div> :
          null
      }
      <div className="queue__cards">CARDS</div>
      {
          selectedPlayerCard ?
          <div className="queue__endzone">
            <span className="queue__arrow icon-arrow-big-right"/>
          </div> :
          null
      }
    </div>
  );
}