import Player from './Player';
import { Props } from './Player';
import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';

let props: Props;
beforeEach(() => {
	props = {
		isActivePlayer: false,
		player: {
			color: 'red',
			discardPile: [ 'assassination', 'conspiracy' ],
			hand: [ 'archer', 'assassination', 'conspiracy' ],
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
	const { container } = render(<Player {...props} />);
	expect(container.querySelector('.player')).toBeInTheDocument();
	expect(container.querySelector('.player--active')).toBe(null);

	const { container: container2 } = render(
		<Player {...{ ...props, isActivePlayer: true }} />
	);
	expect(container2.querySelector('.player')).toBeInTheDocument();
	expect(container2.querySelector('.player--active')).toBeInTheDocument();
});

test('player__name div should display the correct name', () => {
	const { getByText } = render(<Player {...props} />);
	expect(getByText(`${props.player.name}`)).toBeInTheDocument();
});

test('player__name div should have the correct style', () => {
	const { container } = render(<Player {...props} />);
	expect(container.querySelector('.player__name')!.getAttribute('style')).toBe(
		`background-color: ${props.player.color};`
	);
});

test('player__influence div should display the influence number', () => {
	const { getByText } = render(<Player {...props} />);
	expect(getByText(`${props.player.influence}`)).toBeInTheDocument();
});

test('player__discard div should display correct card name characters', () => {
	const { getByText } = render(<Player {...props} />);
	expect(
		getByText(`${props.player.discardPile[0].substr(0, 2)}`)
	).toBeInTheDocument();
	expect(
		getByText(`${props.player.discardPile[1].substr(0, 2)}`)
	).toBeInTheDocument();
});
