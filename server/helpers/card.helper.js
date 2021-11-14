function CardHelper () {

  const cardFuncs = {
    // ambush: require('../cards/ambush'),
    archer: require('../cards/archer'),
    // assassination: require('../cards/assassination'),
    // conspiracy: require('../cards/conspiracy'),
    // heir: require('../cards/heir'),
    // lord: require('../cards/lord'),
    // royal_decree: require('../cards/royal_decree'),
    // shapeshifter: require('../cards/shapeshifter'),
    // soldier: require('../cards/soldier'),
    // spy: require('../cards/spy'),
  }

  const getInfluenceGain = (card) => {
    const cf = cardFuncs[card.id];
    return cf.getInfluenceGain(card);
  };

  const getTargetsForAbility = (card, queue) => {
    const cf = cardFuncs[card.id];
    return cf.getTargetsForAbility(queue);
  }


  return {
    getInfluenceGain,
    getTargetsForAbility,
  }
}

module.exports = CardHelper;