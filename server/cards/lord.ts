import { CARD_EFFECTS } from "../config/game.constants";
import { CardDetail } from "../types/index";
import { Card } from "../types/index";

export const lord: CardDetail = {
  id: "lord",
  name: "Lord",
  text: "Earn 1 influence, plus 1 per adjacent card that is in your family.",
  getInfluenceGainOnReveal: (resolvingCard: Card) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return resolvingCard.influence;
  },
  getTargets: () => {
    // return an empty array if no targets or "self-target" e.g. such as Heir, Lord
    // this enables card highlighting in UI etc
    return {
      targetsSelf: true,
    };
  },
  getAction: (lordCard: Card, queue: Card[][], qri: number) => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceChange prop if this occurs

    let leftIdx = qri - 1;
    let rightIdx = qri + 1;
    // ensure neither off end of queue
    leftIdx = leftIdx < 0 ? 0 : leftIdx;
    rightIdx = rightIdx >= queue.length ? queue.length - 1 : rightIdx;
    const indices = [leftIdx];
    rightIdx !== leftIdx && indices.push(rightIdx);
    const adjacentFamilyIndices = indices.filter((adjIdx: number) => {
      // can't be the Lord itself
      const adjacentCardOwnerId = queue[adjIdx][0].ownerId;
      return adjIdx !== qri && adjacentCardOwnerId === lordCard.ownerId;
    });

    return {
      type: CARD_EFFECTS.GAIN_INFLUENCE,
      influenceChange: 1 + adjacentFamilyIndices.length,
    };
  },
  getDiscardAfterResolution: () => false,
  getActionOnElimination: () => null,
};
