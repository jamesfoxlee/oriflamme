import React, { useContext } from 'react';

import './Player.css';

import { CardsContext } from '../../context/cards.context';
import { UserContext } from '../../context/user.context';

export default function Player (props) {

  const { isActivePlayer, player } = props;
  const { name, influence, imageUrl, discardPile, color } = player;
  const [user] = useContext(UserContext);
  const [cards] = useContext(CardsContext);

  const playerStyle = 'player' + (isActivePlayer ? ' player--active' : '');
  const imageStyles = {
    backgroundImage: `url(${imageUrl})`,
  }

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