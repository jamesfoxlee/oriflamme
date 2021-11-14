const { CARD_EFFECTS } = require('../config/game.constants');

const archer = {
  id: 'archer',
  name: 'Archer',
  text: 'Eliminate the first or last card from the Queue.',
  getInfluenceGain: (resolvingCard) => {
    return resolvingCard.influence;
  },
  getTargetsForAbility: (queue) => {
    const queueStartIdx = 0;
    const queueEndIdx = queue.length - 1;
    const targets = [queueStartIdx];
    queueEndIdx !== queueStartIdx && targets.push(queueEndIdx);
    return targets;
  },
  onAbility: (queue, selfIndex) => {

  },
  afterAbility: () => {

  },
  beforeRecurrentAction: (queue, selfIndex) => {
    // return potential targets and actions

  },
  onRecurrentAction: () => {

  },
  onElimination: () => {

  }
};

module.exports = archer;