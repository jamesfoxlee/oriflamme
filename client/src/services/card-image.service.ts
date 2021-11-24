type CardData = {
	[key: string]: number;
}

// these are all multiples
const CARDFRONTS_RIGHT_OFFSET: CardData = {
	archer        : 1, // zero offset from left of sheet
	assassination : 2,
	shapeshifter  : 3,
	conspiracy    : 4,
	royal_decree  : 5,
	ambush        : 6,
	spy           : 7,
	heir          : 8,
	lord          : 9,
	soldier       : 10
};

const CARDBACKS_RIGHT_OFFSET: CardData = {
	red   : 1,
	green : 2,
	blue  : 3,
	gold  : 4,
	black : 5
};

// NOTE transforms e.g. '1' -> '01' to match file names
const formatter = new Intl.NumberFormat('en-EN', {
	minimumIntegerDigits : 2
});

export function getUrlCardFront (cardId: string, color: string) {
	const colorOffset = CARDBACKS_RIGHT_OFFSET[color];
	const position = CARDFRONTS_RIGHT_OFFSET[cardId];
	if (colorOffset && position) {
		const cardNum = formatter.format(
			6 + colorOffset * position
		);
		return `cards/oriflamme-cards_${cardNum}.gif`;	
	} else {
		throw new Error(`Card id or color is invalid. Card id: ${cardId}; color: ${color}.`);
	}
}

export function getUrlCardBack (color: string) {
	const position = CARDBACKS_RIGHT_OFFSET[color];
	if (position)	{
		const cardNum = formatter.format(position);
		return `cards/oriflamme-cards_${cardNum}.gif`;
	} else {
		throw new Error('Card id or color is invalid.');
	}
}
