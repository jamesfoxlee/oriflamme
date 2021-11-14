const { CARD_EFFECTS } = require('../config/game.constants');

const archer = {
  id: 'archer',
  name: 'Archer',
  text: 'Eliminate the first or last card from the Queue.',
  onCollectInfluence: (thisCard) => {
    // return amount of influence gained when revealed by the owner
    return thisCard.influence;
  },
  beforeReveal: () => {
    // return potential targets and actions

  },
  onReveal: (queue, selfIndex) => {

  },
  afterReveal: () => {

  },
  beforeRecurrentAction: (queue, selfIndex) => {
    // return potential targets and actions
    const queueStartIndex = 0;
    const queueEndIndex = queue.length - 1;
    const targets = [queueStartIndex];
    queueEndIndex !== queueStartIndex && targets.push(queueEndIndex);
    return {
      action: CARD_EFFECTS.ELIMINATE,
      targets,
    }
  },
  onRecurrentAction: () => {

  }
  onElimination: () => {

  }
};

module.exports = archer;