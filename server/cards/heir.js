const { CARD_EFFECTS } = require('../config/game.constants');

const heir = {
  id: 'heir',
  name: 'Heir',
  text: "If there is no other card revealed with the same name, gain 2 influence.",
  getInfluenceGainOnReveal: (resolvingCard) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return resolvingCard.influence;
  },
  getTargetsForAbility: () => {
    // return an empty array if no targets at all
    // return array with index of self if it's a "self-target" e.g. inf gain such as Heir, Lord
    // this enables card highlighting in UI etc
    return [];
  },
  getActionForAbility: (queue, qri) => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceGain prop if this occurs

    const otherHeirs = queue.map(stack => {
    // check top card only - we can ignore revealed heirs that are covered in a Stack
      return stack[0];
    }).filter((queueCard, idx) => {
      return queueCard.revealed &&
             idx !== qri &&
             queueCard.name === heir.name;
    });
    const influenceGain = otherHeirs.length === 0 ? 2 : 0;

    return {
      type: CARD_EFFECTS.GAIN_INFLUENCE,
      influenceGain,
    }
  },
  getDiscardAfterAbility: () => false,
  getActionOnElimination: () => null,
};

module.exports = heir;