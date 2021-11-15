const { CARD_EFFECTS } = require('../config/game.constants');

const archer = {
  id: 'archer',
  name: 'Archer',
  text: 'Eliminate the first or last card from the Queue.',
  getInfluenceGain: (resolvingCard) => {
    return resolvingCard.influence;
  },
  getTargetsForAbility: (queue, qri) => {
    // return an empty array if no targets at all
    // return array with index of self if targets e.g. inf gain such as Heir, Lord
    const queueStartIdx = 0;
    const queueEndIdx = queue.length - 1;
    const targets = [queueStartIdx];
    queueEndIdx !== queueStartIdx && targets.push(queueEndIdx);
    return targets;
  },
  getActionForAbility: (queue, qri) => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceGained prop if this occurs
    return {
      type: CARD_EFFECTS.ELIMINATE,
      influenceGain: 0
    }
  },
  getDiscardAfterAbility: (queue, qri) => false,
  getActionOnElimination: () => null,
};

module.exports = archer;