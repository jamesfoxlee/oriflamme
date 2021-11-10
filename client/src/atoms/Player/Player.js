import React from 'react';

import './Player.css';

export default function Player (props) {

  const { cards, isActivePlayer, player } = props;
  const { name, influence, imageUrl, discardPile, color } = player;

  const playerStyle = 'player' + (isActivePlayer ? ' player--active' : '');
  const imageStyles = {
    backgroundImage: `url(${imageUrl})`,
  }

// OLD INFLUENCE USING PLAYER COLOR
//   <span
//   className="player__influence"
//   style={{backgroundColor: color}}>
//   {influence}
// </span>

  return (
    <div className={playerStyle} style={imageStyles}>
      <div className="player__name" style={{backgroundColor: color}}>{name}</div>
      <div className="player__window">
        <span
          className="player__influence"
        >
          {influence}
        </span>
      </div>
      <div className="player__discard">
      {
        discardPile.length ?
        discardPile.map((card, idx) => {
          return (
            <div
              className="player__discarded-card"
              key={`player-discarded-card-${idx}`}
              style={{backgroundColor: color}}
            >
              {cards[card].name.slice(0, 2)}
            </div>
          )
        }) :
        <div>DISCARD PILE</div>
      }</div>
    </div>
  );
}