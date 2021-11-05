import './Player.css';

// TODO: extract this elsewhere into global config, randomise etc
const COLOR_MAP = {
  red: 'hsla(0, 100%, 55%, 1)',
  purple: 'hsla(235, 100%, 48%, 1)',
  black: 'hsla(0, 0%, 0%, 1)',
  grey: 'hsla(333, 0%, 44%, 1)',
  green: 'hsla(115, 100%, 24%, 1)'
}

export default function Player (props) {

  const {cards, isActivePlayer, player} = props;
  const { name, influence, imageUrl, discardPile, color } = player;

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
        <span className="player__influence" style={colorStyles}>{influence}</span>
      </div>
      <div className="player__discard">
      {
        discardPile.length ?
        discardPile.map(card => {
          return (
            <div
              className="player__discarded-card"
              style={colorStyles}
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