export const players = [
  {
    id: 0,
    color: 'red',
    discardPile: [],
    score: 10,
    name: 'Alan',
    isOwner: true,
    imageUrl: 'https://i.pinimg.com/736x/95/f1/9f/95f19ffceeb264169fa83b2b11f879db--fantasy-queen-fantasy-rpg.jpg'
  },
  {
    id: 1,
    color: 'purple',
    discardPile: ['Archer', 'Spy'],
    name: 'Beatrice',
    score: 7,
    imageUrl: 'https://i.pinimg.com/originals/de/ed/59/deed59f7d0312b416c4cfd1fe5bdbeb2.jpg'
  },
  {
    id: 2,
    color: 'black',
    discardPile: [],
    name: 'Chris',
    score: 14,
    imageUrl: 'https://i.pinimg.com/originals/bd/3e/fa/bd3efa5831d6e82b9b67c8b89478260e.jpg'
  },
  {
    id: 3,
    color: 'grey',
    discardPile: [],
    name: 'Deirdre',
    score: 11,
    imageUrl: 'https://i.pinimg.com/originals/4b/32/e0/4b32e059371a41575518199729c7dfaa.jpg'
  }
];

export const messageHistory = [
  {
    from: 0,
    content: 'gl',
    timestamp: '2021-11-01T15:21:13.892Z'
  },
  {
    from: 0,
    content: 'Ready?',
    timestamp: '2021-11-01T15:20:09.892Z'
  },
  {
    from: 2,
    content: 'Yup  let\'s do this',
    timestamp: '2021-11-01T15:20:33.892Z'
  },
  {
    from: 1,
    content: 'Yeah ready!',
    timestamp: '2021-11-01T15:20:43.892Z'
  },
  {
    from: 0,
    content: 'Hey, how\'s it going',
    timestamp: '2021-11-01T15:20:03.892Z'
  },
  {
    from: 3,
    content: 'Boom',
    timestamp: '2021-11-01T15:21:03.892Z'
  },
];

export const cards = [
  {
    name: "Archer",
    reveal: null,
    activate: {
      ability: "Eliminate the first or last card from the Queue.",
      then: null,
    }
  },
  {
    name: "Shapeshifter",
    reveal: null,
    activate: {
      ability: "Copy the ability of an adjacent revealed character.",
      then: null,
    }
  },
  {
    name: "Conspiracy",
    reveal: {
      ability: "Gain double the influence accumulated on Conspiracy when it is revealed. Discard Conspiracy.",
      then: 'discard',
    },
    activate: null,
  },
  {
    name: "Ambush",
    reveal: {
      ability: "If eliminated by an opponent's character, discard the attacker and gain 4 influence. If you reveal it yourself, gain 1 influence. Discard Ambush",
      then: 'discard',
    },
    activate: null,
  },
  {
    name: "Assassinate",
    reveal: {
      ability: "Elimate any card in the Queue. Discard Assassination.",
      then: 'discard',
    },
    activate: null,
  },
  {
    name: "Lord",
    reveal: null,
    activate: {
      ability: "Earn 1 influence, plus 1 per adjacent card that is in your family.",
      then: null,
    },
  },
  {
    name: "Spy",
    reveal: null,
    activate: {
      ability: "Steal 1 influence from a player who has a card adjacent to your Spy.",
      then: null,
    },
  },
  {
    name: "Heir",
    reveal: null,
    activate: {
      ability: "If there is no other card revealed with the same name, gain 2 influence",
      then: null,
    },
  },
  {
    name: "Soldier",
    reveal: null,
    activate: {
      ability: "Eliminate an adjacent card.",
      then: null,
    },
  },
  {
    name: "Royal Decree",
    reveal: {
      ability: "Move a card wherever you want in the Queue. Discard Royal Decree.",
      then: 'discard',
    },
    activate: null,
  },
]