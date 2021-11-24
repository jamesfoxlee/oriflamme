import PlayerCard, { getStyle } from './PlayerCard';
import { Props } from './PlayerCard';
import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let props: Props;
let noHoverStyles: string;
let hoverStyles: string;
let selectedStyles: string;

beforeEach(() => {
	props = {
		canPlayCard: false,
    cardColor: 'red',
    cardId: 'assassination',
	};

  const { width, hoverWidth, baseDims, hoverDims } = getStyle(props.cardId, props.cardColor);

  noHoverStyles = `width: ${width}px; height: ${baseDims.cardHeight}px; background-size: ${baseDims.sheetWidth}px ${baseDims.sheetHeight}px;`;
  hoverStyles = `width: ${hoverWidth}px; height: ${hoverDims.cardHeight}px; background-size: ${hoverDims.sheetWidth}px ${hoverDims.sheetHeight}px; margin-bottom: ${hoverWidth}px;`;
  // noHoverStyles = `width: ${width}px; height: ${baseDims.cardHeight}px; background-position: bottom ${baseDims.bottomOffset}px right ${baseDims.rightOffset}px; background-size: ${baseDims.sheetWidth}px ${baseDims.sheetHeight}px;`;
  // hoverStyles = `width: ${hoverWidth}px; height: ${hoverDims.cardHeight}px; background-position: bottom ${hoverDims.bottomOffset}px right ${hoverDims.rightOffset}px; background-size: ${hoverDims.sheetWidth}px ${hoverDims.sheetHeight}px; margin-bottom: ${hoverWidth}px;`;
  selectedStyles = 'boxShadow: 0 0 1rem 1rem var(--color-white);';
});

test('player-card__card div gets correct styling', () => {
  const { getByTestId } = render(<PlayerCard {...props} />);
  expect(getByTestId('player-card__card')).toHaveStyle(noHoverStyles);

  userEvent.hover(getByTestId('player-card__card'));
  expect(getByTestId('player-card__card')).toHaveStyle(hoverStyles);
});