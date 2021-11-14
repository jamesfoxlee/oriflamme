const CARDS = {
  ambush: {
    id: 'ambush',
    name: "Ambush",
    reveal: {
      text: "If eliminated by an opponent's character, discard the attacker and gain 4 influence. If you reveal it yourself, gain 1 influence. Discard Ambush.",
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
  assassination: {
    id: 'assassination',
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
      text: "If there is no other card revealed with the same name, gain 2 influence.",
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

module.exports  = CARDS;