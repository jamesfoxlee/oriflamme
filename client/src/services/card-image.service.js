//----------------------------------------------------------------
// This service exists to get the 'coordinates' of a desired image
// from the source image which unfortunately is a large 'sheet' of
// all images. It's a 10 by 6 grid, with the top row of card backs
// being a partial row
//
// src/assets/oriflamme-cards
//
// It's also a WebP image which is annoying to view
//
// individual 'cards' are W:252 by H:462 px
//----------------------------------------------------------------

const SHEET_HEIGHT = 2772; // this is the native width of the WebP image
const SHEET_WIDTH = 2520;  // ditto for height
const CARDS_IN_ROW = 10;
const CARDS_IN_COLUMN = 6;
const HEIGHT_SCALE = (SHEET_HEIGHT / CARDS_IN_COLUMN) / (SHEET_WIDTH / CARDS_IN_ROW);

// these are all multiples
const CARDFRONTS_RIGHT_OFFSET = {
  archer: 1, // zero offset from left of sheet - the background-position
  assassination: 2,
  shapeshifter: 3,
  conspiracy: 4,
  royal_decree: 5,
  ambush: 6,
  spy: 7,
  heir: 8,
  lord: 9,
  soldier: 10
};

const CARDFRONTS_BOTTOM_OFFSET = {
  black: 6,
  gold: 5,
  blue: 4,
  green: 3,
  red: 2,
};

const CARDBACKS_RIGHT_OFFSET = {
  red: 1,
  green: 2,
  blue: 3,
  gold: 4,
  black: 5,
};

const CARDBACKS_BOTTOM_OFFSET = 7;

export function getDataForCardFronts (cardId, color, cardWidth) {
  const cardHeight = cardWidth * HEIGHT_SCALE;
  return {
    cardHeight,
    sheetWidth: CARDS_IN_ROW * cardWidth,
    sheetHeight: CARDS_IN_COLUMN * cardHeight,
    rightOffset: CARDFRONTS_RIGHT_OFFSET[cardId] * cardWidth,
    bottomOffset: CARDFRONTS_BOTTOM_OFFSET[color] * cardHeight,
  }
}

export function getDataForCardBacks (cardId, color, cardWidth) {
  const cardHeight = cardWidth * HEIGHT_SCALE;
  return {
    cardHeight,
    sheetWidth: CARDS_IN_ROW * cardWidth,
    sheetHeight: CARDS_IN_COLUMN * cardHeight,
    rightOffset: CARDBACKS_RIGHT_OFFSET[color] * cardWidth,
    bottomOffset: CARDBACKS_BOTTOM_OFFSET * cardHeight,
  }
}