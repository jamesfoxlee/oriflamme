const { CARD_EFFECTS } = require('../config/game.constants');

const spy = {
  id: 'spy',
  name: 'Spy',
  text: "Steal 1 influence from a player who has a card adjacent to your Spy.",
  getInfluenceGainOnReveal: (resolvingCard) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return resolvingCard.influence;
  },
  getTargets: (resolvingCard, queue, qri) => {
    // return an empty array if no targets or "self-target" e.g. such as Heir, Lord
    // this enables card highlighting in UI etc
    let leftIdx = qri - 1;
    let rightIdx = qri + 1;
    // ensure neither off end of queue
    leftIdx = leftIdx < 0 ? 0 : leftIdx;
    rightIdx = rightIdx >= queue.length ? queue.length - 1 : rightIdx;
    const indices = [leftIdx];
    rightIdx !== leftIdx && indices.push(rightIdx);
    const targets = indices.filter(targetIdx => {
      // can't steal from self
      const targetOwnerId = queue[targetIdx][0].ownerId;
      return targetOwnerId !== resolvingCard.ownerId;
    });
    return {
      targets,
      targetsNoneValid: targets.length === 0,
    }
  },
  getAction: (queue, qri) => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceChange prop if this occurs
    return {
      type: CARD_EFFECTS.STEAL,
      influenceChange: 1,
    }
  },
  getDiscardAfterResolution: () => false,
  getActionOnElimination: () => null,
};

module.exports = spy;