const { CARD_EFFECTS } = require('../config/game.constants');

const assassination = {
  id: 'assassination',
  name: 'Assassination',
  text: "Elimate any card in the Queue. Discard Assassination.",
  getInfluenceGainOnReveal: (resolvingCard) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return resolvingCard.influence;
  },
  getTargetsForAbility: (queue) => {
    // return an empty array if no targets or "self-target" e.g. such as Heir, Lord
    // this enables card highlighting in UI etc

    // Assassination can target anything - simply return all array indices
    return queue.map((_, idx) => idx);
  },
  getActionForAbility: () => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceChange prop if this occurs
    return {
      type: CARD_EFFECTS.ELIMINATE,
      influenceChange: 1
    }
  },
  getDiscardAfterAbility: () => true,
  getActionOnElimination: () => null,
};

module.exports = assassination;