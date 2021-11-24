import { CardDetail } from "../types/index";
import { Card } from "../types/index";
import { ambush } from "../cards/ambush";
import { archer } from "../cards/archer";
import { assassination } from "../cards/assassination";
import { conspiracy } from "../cards/conspiracy";
import { heir } from "../cards/heir";
import { lord } from "../cards/lord";
// royal_decree: require('../cards/royal_decree'),
// shapeshifter: require('../cards/shapeshifter'),
import { soldier } from "../cards/soldier";
import { spy } from "../cards/spy";

export default function CardHelper() {
  type CardFunctions = {
    [key: string]: CardDetail;
  };
  const cardFunctions: CardFunctions = {
    ambush,
    archer,
    assassination,
    conspiracy,
    heir,
    lord,
    // royal_decree: require('../cards/royal_decree'),
    // shapeshifter: require('../cards/shapeshifter'),
    soldier,
    spy,
  };

  // these functions call the respective card function with card, queue, qri
  // many cards don't need all args (will be ignored) - this is simpler for the caller

  const getInfluenceGainOnReveal = (
    card: Card,
    queue: Card[][],
    qri: number
  ) => {
    const cf = cardFunctions[card.id];
    return cf.getInfluenceGainOnReveal(card, queue, qri);
  };

  const getTargets = (card: Card, queue: Card[][], qri: number) => {
    const cf = cardFunctions[card.id];
    const t = cf.getTargets(card, queue, qri);
    return {
      targets: t.targets || [],
      targetsNoneValid: t.targetsNoneValid || false,
      targetsNothing: t.targetsNothing || false,
      targetsSelf: t.targetsSelf || false,
    };
  };

  const getAction = (card: Card, queue: Card[][], qri: number) => {
    const cf = cardFunctions[card.id];
    return cf.getAction(card, queue, qri);
  };

  const getDiscardAfterResolution = (
    card: Card,
    queue: Card[][],
    qri: number
  ) => {
    const cf = cardFunctions[card.id];
    return cf.getDiscardAfterResolution(card, queue, qri);
  };

  const getActionOnElimination = (card: Card, queue: Card[][], qri: number) => {
    const cf = cardFunctions[card.id];
    return cf.getActionOnElimination(card, queue, qri);
  };

  return {
    getInfluenceGainOnReveal,
    getTargets,
    getAction,
    getDiscardAfterResolution,
    getActionOnElimination,
  };
}
