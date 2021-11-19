import Player from './Player';
import { Props } from './Player';
import '@testing-library/jest-dom';

import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react'

let props: Props;
beforeEach(() => {
  props = {
    isActivePlayer: false,
    player: {
      color: 'red',
      discardPile: [],
      hand: [
        'archer',
        'assassination',
        'conspiracy'
      ],
      id: 'n5EKpbcQWdoDvn8lAAAF',
      imageUrl:
        'https://i.pinimg.com/originals/7a/ae/c8/7aaec855ca19276f3884f6b7655fdc33.jpg',
      influence: 1,
      name: 'JFK',
      roomId: '3b805350-4897-11ec-af1c-139452ba1c4c'
    }
  };
});

test('top div should have the correct class name based on player activity', () => {
  const { container } = render(<Player {...props}/>);
  expect(container.querySelector('.player')).toBeInTheDocument();
  expect(container.querySelector('.player--active')).toBe(null);

  const { container: container2 } = render(<Player {...{...props, isActivePlayer: true}}/>);
  expect(container2.querySelector('.player')).toBeInTheDocument();
  expect(container2.querySelector('.player--active')).toBeInTheDocument();
});