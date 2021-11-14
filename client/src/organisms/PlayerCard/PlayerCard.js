import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import './PlayerCard.css';

import useHover from '../../hooks/hover.hook';
import { CardsContext } from '../../context/cards.context';

import { PLAYER_CARD as PC } from '../../config/ui.constants';

export default function PlayerCard(props) {

  const { canPlayCard, cardColor, cardId } = props;

  // "METHODS"

  const handleMouseEnter = (e) => setHovered(true);

  const handleMouseLeave = (e) => setHovered(false);

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
      maxWidth: PC.MAX_WIDTH,
      backgroundColor: cardColor,
    }
  };

  const selectedStyles = {
    card: {
      boxShadow: '0 0 1rem 1rem var(--color-white)',
    }
  };

  // STATE, CONTEXT etc

  const [hovered, setHovered] = useState(false);
  // const [hoverRef, isHovered] = useHover();
  const [cards, selectedPlayerCard, handlePlayerCardClicked] = useContext(CardsContext);

  const card = cards[cardId];
  const isSelected = selectedPlayerCard && selectedPlayerCard.id === cardId;
  const currentHoverStyle = hovered ? hoverStyles.card : noHoverStyles.card;
  const currentSelectedStyle = isSelected ? selectedStyles.card : {};
  const combinedStyle = { ...currentHoverStyle, ...currentSelectedStyle };

  return (
    <div className="player-card__wrapper">
      <div
        className="player-card__card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleCardClicked(card)}
        style={combinedStyle}
      >
        {
          hovered ?
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