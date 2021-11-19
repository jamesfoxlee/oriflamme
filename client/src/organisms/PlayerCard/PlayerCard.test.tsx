import PlayerCard from './PlayerCard';
import { Props } from './PlayerCard';
import '@testing-library/jest-dom';
import { UserContext } from '../../context/user.context';

import React from 'react';
import { render, screen } from '@testing-library/react';

let props: Props;
beforeEach(() => {
	props = {
		canPlayCard: false,
    cardColor: 'red',
    cardId: 'assassination',
	};
});

