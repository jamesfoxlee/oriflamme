const { CARD_EFFECTS } = require('../config/game.constants');

const spy = {
  id: 'spy',
  name: 'Spy',
  text: "Steal 1 influence from a player who has a card adjacent to your Spy.",
  getInfluenceGainOnReveal: (resolvingCard) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return resolvingCard.influence;
  },
  getTargets: () => {
    // return an empty array if no targets or "self-target" e.g. such as Heir, Lord
    // this enables card highlighting in UI etc

    let leftIdx = qri - 1;
    leftIdx = leftIdx < 0 ? 0 : leftIdx; // ensure not off end of queue
    let rightIdx = qri + 1;
    rightIdx = rightIdx === queue.length ? queue.length : rightIdx; // ensure not off end of queue
    const indices = [leftIdx];
    rightIdx !== leftIdx && indices.push(rightIdx);
    let targets;
    if (indices.length === 2) {
      // ignore himself if Soldier has another target - but if he doesn't, he must kill himself!
      targets = indices.filter(target => target !== qri);
    }
    return targets;
  },
  getAction: (queue, qri) => {
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
      influenceChange,
    }
  },
  getDiscardAfterResolution: () => false,
  getActionOnElimination: () => null,
};

module.exports = spy;