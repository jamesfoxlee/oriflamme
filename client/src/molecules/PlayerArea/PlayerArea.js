import React, { useState, useEffect } from 'react';

import './PlayerArea.css';

export default function PlayerArea (props) {
  return (
    <div className="player-area">
      <div className="player-area__player"></div>
      <div className="player-area__cards"></div>
    </div>
  );
}