const { CARD_EFFECTS } = require('../config/game.constants');

const archer = {
  id: 'archer',
  name: 'Archer',
  text: 'Eliminate the first or last card from the Queue.',
  getInfluenceGainOnReveal: (archerCard) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return archerCard.influence;
  },
  getTargets: (archerCard, queue, qri) => {
    // return an empty array if no targets or "self-target" e.g. such as Heir, Lord
    // this enables card highlighting in UI etc
    const queueStartIdx = 0;
    const queueEndIdx = queue.length - 1;
    const targets = [queueStartIdx];
    queueEndIdx !== queueStartIdx && targets.push(queueEndIdx);
    return {
      targets,
      targetsNoneValid: false, // will always be himself to kill
    }
  },
  getAction: () => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceChange prop if this occurs
    return {
      type: CARD_EFFECTS.ELIMINATE,
      influenceChange: 1
    }
  },
  getDiscardAfterResolution: () => false,
  getActionOnElimination: () => null,
};

module.exports = archer;