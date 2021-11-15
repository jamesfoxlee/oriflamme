const { CARD_EFFECTS } = require('../config/game.constants');

const conspiracy = {
  id: 'conspiracy',
  name: 'Conspiracy',
  text: "Gain double the influence accumulated on Conspiracy when it is revealed. Discard Conspiracy.",
  getInfluenceGainOnReveal: (resolvingCard) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return resolvingCard.influence * 2;
  },
  getTargetsForAbility: (queue, qri) => {
    // return an empty array if no targets at all
    // return array with index of self if it's a "self-target" e.g. inf gain such as Heir, Lord
    // this enables card highlighting in UI etc
    return [];
  },
  getActionForAbility: () => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceGain prop if this occurs
    return {
      type: CARD_EFFECTS.NONE,
    }
  },
  getDiscardAfterAbility: () => true,
  getActionOnElimination: () => null,
};

module.exports = conspiracy;