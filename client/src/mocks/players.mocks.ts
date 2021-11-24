import { PlayerType } from '../types/index';

type PlayerMocks = {
  [key: string]: PlayerType;
}

export const playerMocks: PlayerMocks = {
  placeholder: {
    color: '',
    discardPile: [],
    hand: [
      '',
    ],
    id: '',
    imageUrl:
      '',
    influence: 0,
    name: 'placeholder',
    roomId: ''
  },
	simple: {
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