import { QCard } from "../types/index";

type QCardMocks = {
  [key: string]: QCard;
};

export const qCardMocks: QCardMocks = {

	placeholder: {
		id: 'placeholder',
		name: 'Conspiracy',
		text:
			'Gain double the influence accumulated on Conspiracy when it is revealed. Discard Conspiracy.',
		influence: 0,
		ownerId: '',
		ownerColor: 'red'
	},
	simple: {
		id: 'conspiracy',
		name: 'Conspiracy',
		text:
			'Gain double the influence accumulated on Conspiracy when it is revealed. Discard Conspiracy.',
		influence: 0,
		ownerId: '',
		ownerColor: 'red'
	},
	hidden: {
		id: 'assassination',
		name: 'Assassination',
		text: 'Eliminate any card in the Queue. Discard Assassination.',
		revealed: false,
		influence: 0,
		ownerId: '',
		ownerColor: 'red'
	}

};
