function CardHelper () {

  const cardFunctions = {
    // ambush: require('../cards/ambush'),
    archer: require('../cards/archer'),
    assassination: require('../cards/assassination'),
    // conspiracy: require('../cards/conspiracy'),
    // heir: require('../cards/heir'),
    // lord: require('../cards/lord'),
    // royal_decree: require('../cards/royal_decree'),
    // shapeshifter: require('../cards/shapeshifter'),
    // soldier: require('../cards/soldier'),
    // spy: require('../cards/spy'),
  }

  // these functions call the respective card function with card, queue, qri
  // many cards don't need all args (will be ignored) - this is simpler for the caller

  const getInfluenceGainOnReveal = (card, queue, qri) => {
    const cf = cardFunctions[card.id];
    return cf.getInfluenceGainOnReveal(card, queue, qri);
  };

  const getTargetsForAbility = (card, queue, qri) => {
    const cf = cardFunctions[card.id];
    return cf.getTargetsForAbility(queue, qri);
  };

  const getActionForAbility = (card, queue, qri) => {
    const cf = cardFunctions[card.id];
    return cf.getActionForAbility(queue, qri);
  }

  const getDiscardAfterAbility = (card, queue, qri) => {
    const cf = cardFunctions[card.id];
    return cf.getDiscardAfterAbility(queue, qri);
  }

  return {
    getInfluenceGainOnReveal,
    getTargetsForAbility,
    getActionForAbility,
    getDiscardAfterAbility,
  }
}

module.exports = CardHelper;