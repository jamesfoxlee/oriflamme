import Player from './Player';
import { Card, PlayerType } from '../../types';
import { cards } from '../../mocks/cards.mocks';
import { Props } from './Player';
import '@testing-library/jest-dom';

import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

describe('Player', () => {

  let props: Props;
  beforeEach(() => {
    props = {
      isActivePlayer: false,
      // player: {
      //   color: 'red',
      //   discardPile: string[];
      //   hand: string[];
      //   id: string;
      //   imageUrl: string;
      //   influence: number;
      //   name: string;
      //   roomId: string;
      // },
    }
  });

  describe('top div', () => {
    it('should have the correct class name based on player activity', () => {

    });
  });
});