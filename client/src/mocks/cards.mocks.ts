import { Card } from '../types/index';

export const cards: Card[] = [
	{
		id: 'conspiracy',
		name: 'Conspiracy',
		text:
			'Gain double the influence accumulated on Conspiracy when it is revealed. Discard Conspiracy.'
	},
	{
		id: 'assassination',
		name: 'Assassination',
		text: 'Eliminate any card in the Queue. Discard Assassination.',
		revealed: false
	}
];
