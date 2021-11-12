import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import './PlayerCard.css';

import useHover from '../../hooks/hover.hook';
import { CardsContext } from '../../context/cards.context';

import { PLAYER_CARD as PC } from '../../config/ui.constants';

export default function PlayerCard(props) {

  const { canPlayCard, cardColor, cardId } = props;

  // "METHODS"

  const handleCardClicked = (card) => {
    canPlayCard && handlePlayerCardClicked(card);
  }

  // DYNAMIC STYLES

  const width = PC.WIDTH;
  const height = width * PC.HEIGHT_SCALE;

  const noHoverStyles = {
    card: {
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: cardColor,
    }
  };

  const hoverStyles = {
    card: {
      marginBottom: `${width}px`,
      width: `${width * PC.HOVER_SCALE}px`,
      height: `${height * PC.HOVER_SCALE}px`,
      backgroundColor: cardColor,
    }
  };

  const selectedStyles = {
    card: {
      boxShadow: '0 0 1rem 1rem var(--color-white)',
    }
  };

  // STATE, CONTEXT etc

  const [hoverRef, isHovered] = useHover();
  const [cards, selectedPlayerCard, handlePlayerCardClicked] = useContext(CardsContext);

  const card = cards[cardId];
  const isSelected = cardId === selectedPlayerCard;
  const currentHoverStyle = isHovered ? hoverStyles.card : noHoverStyles.card;
  const currentSelectedStyle = isSelected ? selectedStyles.card : {};
  const combinedStyle = { ...currentHoverStyle, ...currentSelectedStyle };

  return (
    <div className="player-card">
      <div
        className="player-card__element"
        onClick={() => handleCardClicked(card)}
        ref={hoverRef}
        style={combinedStyle}
      >
        {
          isHovered ?
            <div className="player-card__text">{card.text}</div> :
            null
        }
        <div className="player-card__name">{card.name}</div>
      </div>
    </div>
  );
}

//----------------------------------------------------------------
// PROPS
//----------------------------------------------------------------

const { bool, string } = PropTypes;

PlayerCard.propTypes = {
  canPlayCard: bool.isRequired,
  cardColor: string.isRequired,
  cardId: string.isRequired,
};