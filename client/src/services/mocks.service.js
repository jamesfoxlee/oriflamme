export const gameState = {
  players: [
    {
      id: 'al',
      color: 'hsla(0, 100%, 55%, 1)',
      discardPile: ['ambush'],
      hand: ['ambush', 'archer', 'assassinate', 'conspiracy', 'heir', 'lord', 'royal_decree', 'shapeshifter', 'soldier', 'spy'],
      imageUrl: 'https://i.pinimg.com/originals/9f/0f/b8/9f0fb83b052da2fe53003f26ce1bf0b1.jpg',
      influence: 10,
      name: 'Alan',
    },
    {
      id: 'be',
      color: 'hsla(235, 100%, 48%, 1)',
      discardPile: ['assassinate', 'spy'],
      hand: ['ambush', 'archer', 'assassinate', 'conspiracy', 'heir', 'lord', 'royal_decree', 'shapeshifter', 'soldier', 'spy'],
      imageUrl: 'https://i.pinimg.com/originals/de/ed/59/deed59f7d0312b416c4cfd1fe5bdbeb2.jpg',
      influence: 7,
      name: 'Beatrice',
    },
    {
      id: 'ch',
      color: 'hsla(0, 0%, 0%, 1)',
      discardPile: [],
      hand: ['ambush', 'archer', 'assassinate', 'conspiracy', 'heir', 'lord', 'royal_decree', 'shapeshifter', 'soldier', 'spy'],
      imageUrl: 'https://i.pinimg.com/originals/7a/ae/c8/7aaec855ca19276f3884f6b7655fdc33.jpg',
      influence: 14,
      name: 'Chris',
    },
    {
      id: 'de',
      color: 'hsla(333, 0%, 44%, 1)',
      discardPile: [],
      hand: ['ambush', 'archer', 'assassinate', 'conspiracy', 'heir', 'lord', 'royal_decree', 'shapeshifter', 'soldier', 'spy'],
      imageUrl: 'https://i.pinimg.com/originals/4b/32/e0/4b32e059371a41575518199729c7dfaa.jpg',
      influence: 11,
      name: 'Deirdre',
    },
    {
      id: 'ed',
      color: 'hsla(115, 100%, 24%, 1)',
      discardPile: ['royal_decree'],
      hand: ['ambush', 'archer', 'assassinate', 'conspiracy', 'heir', 'lord', 'royal_decree', 'shapeshifter', 'soldier', 'spy'],
      influence: 6,
      imageUrl: 'https://i.pinimg.com/736x/cd/0a/48/cd0a4811395c05bf10170e7e15fc3c9b.jpg',
      name: 'Edward',
    }
  ],
  queue: {

  }
}

export const cards = {
  ambush: {
    id: 'ambush',
    name: "Ambush",
    reveal: {
      text: "If eliminated by an opponent's character, discard the attacker and gain 4 influence. If you reveal it yourself, gain 1 influence. Discard Ambush",
      then: 'discard',
    },
    activate: null,
  },
  archer: {
    id: 'archer',
    name: "Archer",
    reveal: null,
    activate: {
      text: "Eliminate the first or last card from the Queue.",
      then: null,
    }
  },
  assassinate: {
    id: 'assassinate',
    name: "Assassinate",
    reveal: {
      text: "Elimate any card in the Queue. Discard Assassination.",
      then: 'discard',
    },
    activate: null,
  },
  conspiracy: {
    id: 'conspiracy',
    name: "Conspiracy",
    reveal: {
      text: "Gain double the influence accumulated on Conspiracy when it is revealed. Discard Conspiracy.",
      then: 'discard',
    },
    activate: null,
  },
  heir: {
    id: 'heir',
    name: "Heir",
    reveal: null,
    activate: {
      text: "If there is no other card revealed with the same name, gain 2 influence",
      then: null,
    },
  },
  lord: {
    id: 'lord',
    name: "Lord",
    reveal: null,
    activate: {
      text: "Earn 1 influence, plus 1 per adjacent card that is in your family.",
      then: null,
    },
  },
  royal_decree: {
    id: 'royal_decree',
    name: "Royal Decree",
    reveal: {
      text: "Move a card wherever you want in the Queue. Discard Royal Decree.",
      then: 'discard',
    },
    activate: null,
  },
  shapeshifter: {
    id: 'shapeshifter',
    name: "Shapeshifter",
    reveal: null,
    activate: {
      text: "Copy the ability of an adjacent revealed character.",
      then: null,
    }
  },
  soldier: {
    id: 'soldier',
    name: "Soldier",
    reveal: null,
    activate: {
      text: "Eliminate an adjacent card.",
      then: null,
    },
  },
  spy: {
    id: 'spy',
    name: "Spy",
    reveal: null,
    activate: {
      text: "Steal 1 influence from a player who has a card adjacent to your Spy.",
      then: null,
    },
  },
};

export const messages = [
  {
    from: 'be',
    content: 'gl',
    timestamp: '2021-11-01T15:21:13.892Z'
  },
  {
    from: 'ed',
    content: 'Ready?',
    timestamp: '2021-11-01T15:20:09.892Z'
  },
  {
    from: 'de',
    content: 'Yup  let\'s do this',
    timestamp: '2021-11-01T15:20:33.892Z'
  },
  {
    from: 'al',
    content: 'Yeah ready!',
    timestamp: '2021-11-01T15:20:43.892Z'
  },
  {
    from: 'ed',
    content: 'Hey, how\'s it going',
    timestamp: '2021-11-01T15:20:03.892Z'
  },
  {
    from: 'ch',
    content: 'Boom',
    timestamp: '2021-11-01T15:21:03.892Z'
  },
];