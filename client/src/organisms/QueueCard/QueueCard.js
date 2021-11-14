import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import './QueueCard.css';
import QCButtons from '../../atoms/QCButtons/QCButtons';

import { SocketContext } from '../../context/socket.context';
import { UserContext } from '../../context/user.context';
import { QUEUE_CARD } from '../../config/ui.constants';

export default function QueueCard(props) {

  const handleMouseEnter = (e) => setHovered(true);
  const handleMouseLeave = (e) => setHovered(false);

  const handleNoReveal = () => socket.queueNoReveal(qri);
  const handleReveal = () => socket.queueReveal(qri);
  const handleConfirmTarget = () => socket.queueConfirmTarget(qri);

  // PROPS, STATE, CONTEXT etc

  const { card, isPlayerTurn, isResolving, isTarget, isTargettingWindow, qri } = props;

  const [hovered, setHovered] = useState(false);
  const socket = useContext(SocketContext);
  const [user] = useContext(UserContext);

  const { revealed } = card;
  const isOwned = card.ownerId === user.id;

  // DYNAMIC STYLES

  const width = QUEUE_CARD.WIDTH;
  const height = width * QUEUE_CARD.HEIGHT_SCALE;

  const notRevealedStyles = {
    backgroundColor: card.ownerColor,
  };

  const revealedStyles = {
    backgroundColor: card.ownerColor,
  };

  const noHoverStyles = {
    width: `${width}px`,
    maxWidth: QUEUE_CARD.MAX_WIDTH,
    height: `${height}px`,
  };

  const hoverStyles = {
    width: `${width * QUEUE_CARD.HOVER_SCALE}px`,
    height: `${height * QUEUE_CARD.HOVER_SCALE}px`,
    backgroundColor: card.ownerColor,
  };

  const resolvingStyles = {
    boxShadow: '0 0 1rem 1rem var(--color-white)',
  };

  const targettedStyles = {
    boxShadow: '0 0 1rem 1rem var(--color-gold)',
  };

  const revStyle = card.revealed ? revealedStyles : notRevealedStyles;
  const hovStyle = hovered ? hoverStyles : noHoverStyles;
  const resStyle = isResolving ? (isTarget ? targettedStyles : resolvingStyles) : {};
  const tarStyle = isTarget ? targettedStyles : {};
  const combinedStyle = { ...revStyle, ...hovStyle, ...resStyle, ...tarStyle };

  return (
    <div className="queue-card">
      <div
        className="queue-card__card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={combinedStyle}
      >
        {
          !revealed && !isOwned ?
            <div className="queue-card__card-wrapper">
              <div className="queue-card__back">O</div>
            </div> :
            null
        }
        {
          (revealed || isOwned) && !hovered ?
            <div className="queue-card__card-wrapper">
              <div className="queue-card__name">{card.name}</div>
            </div> :
            null
        }
        {
          (revealed || isOwned) && hovered ?
            <div className="queue-card__card-wrapper">
              <div className="queue-card__text">{card.text}</div>
              <div className="queue-card__name">{card.name}</div>
            </div> :
            null
        }
        {
          card.influence ?
            <span className="queue-card__influence">{card.influence}</span> :
            null
        }
      </div>
      {
        isPlayerTurn && isResolving && isOwned && !isTargettingWindow ?
          <QCButtons
            onYes={handleReveal}
            onNo={handleNoReveal}
            text="Reveal?"
          /> :
          null
      }
      {
        isPlayerTurn && isTarget ?
          <QCButtons
            onYes={handleConfirmTarget}
            text="Target?"
          /> :
          null
      }
    </div>
  );
}

//----------------------------------------------------------------
// PROPS
//----------------------------------------------------------------

const { bool, object } = PropTypes;

QueueCard.propTypes = {
  card: object.isRequired,
  isResolving: bool,
};

QueueCard.defaultProps = {
  isResolving: false,
};