function CardHelper () {

  const cardFunctions = {
    // ambush: require('../cards/ambush'),
    archer: require('../cards/archer'),
    assassination: require('../cards/assassination'),
    conspiracy: require('../cards/conspiracy'),
    heir: require('../cards/heir'),
    // lord: require('../cards/lord'),
    // royal_decree: require('../cards/royal_decree'),
    // shapeshifter: require('../cards/shapeshifter'),
    soldier: require('../cards/soldier'),
    // spy: require('../cards/spy'),
  }

  // these functions call the respective card function with card, queue, qri
  // many cards don't need all args (will be ignored) - this is simpler for the caller

  const getInfluenceGainOnReveal = (card, queue, qri) => {
    const cf = cardFunctions[card.id];
    return cf.getInfluenceGainOnReveal(card, queue, qri);
  };

  const getTargets = (card, queue, qri) => {
    const cf = cardFunctions[card.id];
    const t = cf.getTargets(queue, qri);
    return {
      targets: t.targets || [],
      targetsNoneValid: t.targetsNoneValid || false,
      targetsNothing: t.targetsNothing || false,
      targetsSelf: t.targetsSelf || false,
    }
  };

  const getAction = (card, queue, qri) => {
    const cf = cardFunctions[card.id];
    return cf.getAction(queue, qri);
  }

  const getDiscardAfterResolution = (card, queue, qri) => {
    const cf = cardFunctions[card.id];
    return cf.getDiscardAfterResolution(queue, qri);
  }

  return {
    getInfluenceGainOnReveal,
    getTargets,
    getAction,
    getDiscardAfterResolution,
  }
}

module.exports = CardHelper;