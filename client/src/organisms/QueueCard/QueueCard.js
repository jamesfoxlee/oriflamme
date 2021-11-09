import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import './QueueCard.css';
import Button from '../../atoms/Button/Button';

import useHover from '../../hooks/hover.hook';
import { UserContext } from '../../context/user.context';
import userEvent from '@testing-library/user-event';

const HEIGHT_SCALE = 1.5;

export default function QueueCard(props) {

  const { card, isResolving, revealed, scaleFactor, width } = props;
  const height = width * HEIGHT_SCALE;
  const [hovered, setHovered] = useState(false);
  const [user] = useContext(UserContext);

  // "METHODS"

  const handleMouseEnter = (e) => setHovered(true);

  const handleMouseLeave = (e) => setHovered(false);

  const handleReveal = () => {
    console.log('REVEAL');
    // if (canPlayCard) {
    //   setSelected(!selected);
    //   const value = !selected ? card : null;
    //   onQueueCardClicked(value);
    // }
  }

  const handleLeaveUnrevealed = () => {
    console.log('DON\'T REVEAL');
  }

  // DYNAMIC STYLES

  const notRevealedStyles = {
    backgroundColor: card.ownerColor,
    filter: 'brightness(0.7)'
  };

  const revealedStyles = {
    backgroundColor: card.ownerColor,
  };

  const noHoverStyles = {
    width: `${width}px`,
    maxWidth: 120,
    height: `${height}px`,
  };

  const hoverStyles = {
    width: `${width * scaleFactor}px`,
    maxWidth: 120,
    height: `${height * scaleFactor}px`,
    backgroundColor: card.ownerColor,
  };

  const resolvingStyles = {
    boxShadow: '0 0 1rem 1rem var(--color-white)',
  };

  const rStyle = card.revealed ? revealedStyles : notRevealedStyles;
  const hStyle = hovered ? hoverStyles : noHoverStyles;
  const sStyle = isResolving ? resolvingStyles : {};
  const combinedStyle = { ...rStyle, ...hStyle, ...sStyle };

  const isOwned = card.ownerId === user.id;

  return (
    <div
      className="queue-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="queue-card__card" style={combinedStyle}>
        {
          hovered && (isOwned || card.revealed) ?
            <div className="queue-card__text">{card.text}</div> :
            null
        }
        {
          isOwned || card.revealed ?
           <div className="queue-card__name">{card.name}</div> :
           null
        }
      </div>
      {
        isResolving && isOwned ?
          <div className="queue-card__prompt">
            Reveal?
            <div className="queue-card__buttons">
              <button
                autoComplete="off"
                className="queue-card__button"
                onClick={handleReveal}
                type="button"
              >
                <span className="queue-card__button-icon icon-check" />
              </button>
              <button
                autoComplete="off"
                className="queue-card__button"
                onClick={handleLeaveUnrevealed}
                type="button"
              >
                <span className="queue-card__button-icon icon-cross" />
              </button>
            </div>
          </div> :
          null
      }
    </div>
  );
}

//----------------------------------------------------------------
// PROPS
//----------------------------------------------------------------

const { bool, number, string, object } = PropTypes;

QueueCard.propTypes = {
  card: object.isRequired,
  scaleFactor: number,
  width: number,
};

QueueCard.defaultProps = {
  scaleFactor: 1.5,
  width: 100
};