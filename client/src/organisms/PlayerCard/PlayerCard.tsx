import React, { useState, useContext } from 'react';
import { Card } from '../../types/index';
import './PlayerCard.css';

import { CardsContext } from '../../context/cards.context';
import { getDataForCardFronts } from '../../services/card-image.service';
import { PLAYER_CARD as PC } from '../../config/ui.constants';

export type Props = {
	canPlayCard: boolean;
	cardColor: string;
	cardId: string;
};

export function getStyle (cardId: string, cardColor: string) {
	const width = PC.WIDTH;
	const hoverWidth = width * PC.HOVER_SCALE;
	const baseDims = getDataForCardFronts(cardId, cardColor, width);
	const hoverDims = getDataForCardFronts(cardId, cardColor, hoverWidth);

	return {
		width,
		hoverWidth,
		baseDims,
		hoverDims
	};
}

export default function PlayerCard (props: Props) {
	const { canPlayCard, cardColor, cardId } = props;

	// "METHODS"

	const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () =>
		setHovered(true);

	const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () =>
		setHovered(false);

	const handleCardClicked = (card: Card) => {
		if (canPlayCard) handlePlayerCardClicked(card);
	};

	// DYNAMIC STYLES
	const { width, hoverWidth, baseDims, hoverDims } = getStyle(
		cardId,
		cardColor
	);

	const noHoverStyles = {
		width: `${width}px`,
		height: `${baseDims.cardHeight}px`,
		backgroundPosition: `bottom ${baseDims.bottomOffset}px right ${baseDims.rightOffset}px`,
		backgroundSize: `${baseDims.sheetWidth}px ${baseDims.sheetHeight}px`
	};

	const hoverStyles = {
		marginBottom: `${hoverWidth}px`,
		width: `${hoverWidth}px`,
		height: `${hoverDims.cardHeight}px`,
		backgroundPosition: `bottom ${hoverDims.bottomOffset}px right ${hoverDims.rightOffset}px`,
		backgroundSize: `${hoverDims.sheetWidth}px ${hoverDims.sheetHeight}px`
	};

	const selectedStyles = {
		boxShadow: '0 0 1rem 1rem var(--color-white)'
	};

	// STATE, CONTEXT etc

	const [ hovered, setHovered ] = useState(false);
	const { cards, selectedPlayerCard, handlePlayerCardClicked } = useContext(
		CardsContext
	);

	const card = cards[cardId];
	const isSelected = selectedPlayerCard && selectedPlayerCard.id === cardId;
	const currentHoverStyle = hovered ? hoverStyles : noHoverStyles;
	const currentSelectedStyle = isSelected ? selectedStyles : {};
	const combinedStyle = { ...currentHoverStyle, ...currentSelectedStyle };

	return (
		<div data-testid='player-card' className='player-card__wrapper'>
			<div
				data-testid='player-card__card'
				className='player-card__card'
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={() => handleCardClicked(card)}
				style={combinedStyle}
			/>
		</div>
	);
}
