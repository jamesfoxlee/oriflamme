import '@testing-library/jest-dom';
import React from 'react';
import Message, { Props } from './Message';
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
		from: 'John Fitzgerald Kennedy',
		message: {
			content: 'I feel a pang in my head.'
		}
	};

	act(() => {
		render(<Message {...props} />, container);
	});

	expect(container.querySelector('.message__from')!.textContent).toBe(
		'John Fitzgerald Kennedy:'
	);
	expect(container.querySelector('.message__content')!.textContent).toBe(
		'I feel a pang in my head.'
	);
});
