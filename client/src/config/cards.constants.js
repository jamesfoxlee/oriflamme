export const CARDS = {
  ambush: {
    id: 'ambush',
    name: "Ambush",
    text: "If eliminated by an opponent's character, discard the attacker and gain 4 influence. If you reveal it yourself, gain 1 influence. Discard Ambush.",
  },
  archer: {
    id: 'archer',
    name: "Archer",
    text: "Eliminate the first or last card in the Queue.",
  },
  assassinate: {
    id: 'assassinate',
    name: "Assassinate",
    text: "Elimate any card in the Queue. Discard Assassination.",
    activate: null,
  },
  conspiracy: {
    id: 'conspiracy',
    name: "Conspiracy",
    text: "Gain double the influence accumulated on Conspiracy when it is revealed. Discard Conspiracy.",
  },
  heir: {
    id: 'heir',
    name: "Heir",
    text: "If there is no other card revealed with the same name, gain 2 influence",
  },
  lord: {
    id: 'lord',
    name: "Lord",
    reveal: null,
    text: "Earn 1 influence, plus 1 per adjacent card that is in your family.",
  },
  royal_decree: {
    id: 'royal_decree',
    name: "Royal Decree",
    text: "Move a card wherever you want in the Queue. Discard Royal Decree.",
  },
  shapeshifter: {
    id: 'shapeshifter',
    name: "Shapeshifter",
    text: "Copy the ability of an adjacent revealed character.",
  },
  soldier: {
    id: 'soldier',
    name: "Soldier",
    text: "Eliminate an adjacent card.",
  },
  spy: {
    id: 'spy',
    name: "Spy",
    text: "Steal 1 influence from a player who has a card adjacent to your Spy.",
  },
};
