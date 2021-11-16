const { CARD_EFFECTS } = require('../config/game.constants');

const ambush = {
  id: 'ambush',
  name: 'Ambush',
  text: 'If eliminated by an opponent\'s character, discard the attacker and gain 4 influence. If you reveal it yourself, gain 1 influence. Discard Ambush.',
  getInfluenceGainOnReveal: (ambushCard) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return 1;
  },
  getTargets: () => {
    // return an empty array if no targets or "self-target" e.g. such as Heir, Lord
    // this enables card highlighting in UI etc
    return {
      targetsNothing: true, // only if revealed by owner, everything happens on elimination...
    }
  },
  getAction: () => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceChange prop if this occurs
    return {
      type: CARD_EFFECTS.NONE,
    }
  },
  getDiscardAfterResolution: () => true,
  getActionOnElimination: (ambushCard, queue, qri) => {
    const eliminatingCard = queue[qri][0];
    if (eliminatingCard.id === 'assassination') {
      return null;
    } else {
      ambushCard.revealed = true;
      return {
        type: CARD_EFFECTS.ELIMINATE_ATTACKER,
        influenceChange: 4
      }
    }
  },
};

module.exports = ambush;