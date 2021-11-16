const { CARD_EFFECTS } = require('../config/game.constants');

const soldier = {
  id: 'soldier',
  name: 'Soldier',
  text: "Eliminate an adjacent card.",
  getInfluenceGainOnReveal: (resolvingCard) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return resolvingCard.influence;
  },
  getTargets: (queue, qri) => {
    // return an empty array if no targets or "self-target" e.g. such as Heir, Lord
    // this enables card highlighting in UI etc
    let leftIdx = qri - 1;
    leftIdx = leftIdx < 0 ? 0 : leftIdx; // ensure not off end of queue
    let rightIdx = qri + 1;
    rightIdx = rightIdx >= queue.length ? queue.length - 1 : rightIdx; // ensure not off end of queue
    const indices = [leftIdx];
    rightIdx !== leftIdx && targets.push(rightIdx);
    // if (targets.length === 2) {
    //   // ignore himself if Soldier has another target - but if he doesn't, he must kill himself!
    //   return targets.filter(target => target !== qri);
    // }
    // must kill own family if no valid target, but won't kill himself
    // TODO: Check the rule!!
    const targets = indices.filter(target => target !== qri);
    return {
      targets,
      targetsNoneValid: targets.length === 0,
    }
  },
  getAction: (queue, qri) => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceGain prop if this occurs
    return {
      type: CARD_EFFECTS.ELIMINATE,
      influenceChange: 1,
    }
  },
  getDiscardAfterResolution: () => false,
  getActionOnElimination: () => null,
};

module.exports = soldier;