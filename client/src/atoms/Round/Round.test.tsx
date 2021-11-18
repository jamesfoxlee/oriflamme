import Round, { Props } from './Round';

import '@testing-library/jest-dom';
import React from 'react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container: HTMLElement;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
});

test('loads and displays message', async () => {
	const props: Props = {
		round: 3
	};

	act(() => {
		render(<Round {...props} />, container);
	});
	expect(container.querySelector('.round__text')!.textContent).toBe('Round 3');
  
  const props2: Props = {
		round: 6
	};

	act(() => {
		render(<Round {...props2} />, container);
	});
	expect(container.querySelector('.round__text')!.textContent).toBe('Final Round');
});