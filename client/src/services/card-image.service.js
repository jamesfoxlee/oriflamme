const SHEET_HEIGHT = 2772; // this is the native width of the WebP image
const SHEET_WIDTH = 2520; // ditto for height
const CARDS_IN_ROW = 10;
const CARDS_IN_COLUMN = 6;
const HEIGHT_SCALE =
	SHEET_HEIGHT / CARDS_IN_COLUMN / (SHEET_WIDTH / CARDS_IN_ROW);

// these are all multiples
const CARDFRONTS_RIGHT_OFFSET = {
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

const CARDFRONTS_BOTTOM_OFFSET = {
	black : 6,
	gold  : 5,
	blue  : 4,
	green : 3,
	red   : 2
};

const CARDBACKS_RIGHT_OFFSET = {
	red   : 1,
	green : 2,
	blue  : 3,
	gold  : 4,
	black : 5
};

const CARDBACKS_BOTTOM_OFFSET = 7;

// NOTE transforms e.g. '1' -> '01' to match file names
const formatter = new Intl.NumberFormat('en-EN', {
	minimumIntegerDigits : 2
});

export function getUrlCardFront (cardId, color) {
	const cardNum = formatter.format(
		6 + CARDFRONTS_RIGHT_OFFSET[cardId] * CARDBACKS_RIGHT_OFFSET[color]
	);
	return `cards/oriflamme-cards_${cardNum}.gif`;
}

export function getUrlCardBack (color) {
  const cardNum = formatter.format(
		CARDBACKS_RIGHT_OFFSET[color]
	);
	return `cards/oriflamme-cards_${cardNum}.gif`;
}

export function getDataForCardFronts (cardId, color, cardWidth) {
	const cardHeight = cardWidth * HEIGHT_SCALE;
	return {
		cardHeight,
		sheetWidth   : CARDS_IN_ROW * cardWidth,
		sheetHeight  : CARDS_IN_COLUMN * cardHeight,
		rightOffset  : CARDFRONTS_RIGHT_OFFSET[cardId] * cardWidth,
		bottomOffset : CARDFRONTS_BOTTOM_OFFSET[color] * cardHeight
	};
}

export function getDataForCardBacks (cardId, color, cardWidth) {
	const cardHeight = cardWidth * HEIGHT_SCALE;
	return {
		cardHeight,
		sheetWidth   : CARDS_IN_ROW * cardWidth,
		sheetHeight  : CARDS_IN_COLUMN * cardHeight,
		rightOffset  : CARDBACKS_RIGHT_OFFSET[cardId] * cardWidth,
		bottomOffset : CARDBACKS_BOTTOM_OFFSET[color] * cardHeight
	};
}
