export const INITIAL_GAMESTATE = {
  abilityInterrupted: false,
  activePlayerId: null,
  numPlayers: 0,
  phase: 'planning',
  planningPhasePlayed: 0,
  players: {},
  queue: [],
  queueResolutionIndex: 0,
  queueTargets: [],
  roomId: null,
  round: 1,
  targets: [],
  targetsNoneValid: false,
  targettedIndex: null,
  targetsSelf: false,
  turnOrder: [],
  turnOrderIndex: 0
}

export const INITIAL_PLAYERSTATE = {
  id: null,
  color: null,
  discardPile: [],
  hand: null,
  imageUrl: null,
  influence: 1,
  name: null,
}

export const PHASES = {
  PLANNING: 'planning',
  RESOLUTION: 'resolution',
};

export const PLAYER_IMAGES = [
  'https://i.pinimg.com/originals/7a/ae/c8/7aaec855ca19276f3884f6b7655fdc33.jpg',  // dude crouching with sword
  'https://i.pinimg.com/originals/9f/0f/b8/9f0fb83b052da2fe53003f26ce1bf0b1.jpg',  // redhead lady
  'https://i.pinimg.com/736x/b1/28/02/b1280264c265c556d55368bb29204987.jpg',       // brunette in armor
  'https://cdna.artstation.com/p/assets/images/images/002/208/984/large/randy-vargas-vargasni-forest-princess.jpg?1458727382', // riding wolf
  'https://i.pinimg.com/originals/cf/ad/12/cfad12db7aca44ddfebcebb7854d61fa.jpg',  // girl with wolf
  'https://i.pinimg.com/736x/dd/41/45/dd4145359fce1b1f422be2094d1abec5.jpg',       // riding lion
  'https://i.pinimg.com/originals/de/ed/59/deed59f7d0312b416c4cfd1fe5bdbeb2.jpg',  // dude with chalice
  'https://i.pinimg.com/originals/4b/32/e0/4b32e059371a41575518199729c7dfaa.jpg',  // brunette lady
  'https://i.pinimg.com/736x/cd/0a/48/cd0a4811395c05bf10170e7e15fc3c9b.jpg',       // lady in black
];

export const PLAYER_COLORS = [
  'red',
  'blue',
  'black',
  'gold',
  'green',
];

export const STARTING_HAND_FULL = [
  'ambush',
  'archer',
  'assassination',
  'conspiracy',
  'heir',
  'lord',
  'royal_decree',
  'shapeshifter',
  'soldier',
  'spy'
];

export const STARTING_HAND_SIMPLE = [
  'archer',
  'assassination',
  'conspiracy',
  'heir',
  'lord',
  'soldier',
  'spy'
];

export const CARD_EFFECTS = {
  NONE: 'none',
  GAIN_INFLUENCE: 'gain_influence',
  STEAL: 'steal',
  ELIMINATE: 'eliminate',
  MOVE: 'move',
  COPY_ABILITY: 'copy_ability'
};


