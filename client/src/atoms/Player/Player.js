import './Player.css';

// TODO: extract this elsewhere into global config, randomise etc
const COLOR_MAP = {
  red: 'hsla(0, 100%, 55%, 1)',
  purple: 'hsla(235, 100%, 48%, 1)',
  black: 'hsla(0, 0%, 0%, 1)',
  grey: 'hsla(333, 0%, 44%, 1)'
}

export default function Player ({isActivePlayer, player}) {

  const { name, score, imageUrl, discardPile, color } = player;

  const playerStyle = 'player' + (isActivePlayer ? ' player--active' : '');

  const imageStyles = {
    backgroundImage: `url(${imageUrl})`,
  }

  const colorStyles = {
    backgroundColor: COLOR_MAP[color]
  }

  return (
    <div className={playerStyle} style={imageStyles}>
      <div className="player__name" style={colorStyles}>{name}</div>
      <div className="player__window">
        <span className="player__score" style={colorStyles}>{score}</span>
      </div>
      <div className="player__discard">
      {
        discardPile.length ?
        discardPile.map(card => {
          return (
            <div className="player__discarded-card">{card.slice(0, 2)}</div>
          )
        }) :
        <div>DISCARD</div>
      }</div>
    </div>
  );
}