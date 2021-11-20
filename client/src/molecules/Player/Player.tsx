import React, { useContext } from 'react';
import { PlayerType } from '../../types/index';
import './Player.css';

// import { CardsContext } from '../../context/cards.context';

export type Props = {
  isActivePlayer: boolean;
  player: PlayerType;
}

export default function Player (props: Props) {

  const { isActivePlayer, player } = props;
  const { name, influence, imageUrl, discardPile, color } = player;
  // const [cards] = useContext(CardsContext);

  const playerStyle = 'player' + (isActivePlayer ? ' player--active' : '');
  const imageStyles = {
    backgroundImage: `url(${imageUrl})`,
  }

  return (
    <div data-testid="player" className={playerStyle} style={imageStyles}>
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
              {card.substr(0, 2)}
            </div>
          )
        }) :
        <div>DISCARD PILE</div>
      }</div>
    </div>
  );
}