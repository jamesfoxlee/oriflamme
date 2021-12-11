const { CARD_EFFECTS } = require("../config/game.constants");
import { CardDetail } from "../types/index";
import { Card } from "../types/index";

export const soldier: CardDetail = {
  id: "soldier",
  name: "Soldier",
  text: "Eliminate an adjacent card.",
  getInfluenceGainOnReveal: (soldierCard: Card) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return soldierCard.influence;
  },
  getTargets: (soldierCard: Card, queue: Card[][], qri: number) => {
    // return an empty array if no targets or "self-target" e.g. such as Heir, Lord
    // this enables card highlighting in UI etc
    let leftIdx = qri - 1;
    let rightIdx = qri + 1;
    // ensure neither off the end of queue
    leftIdx = leftIdx < 0 ? 0 : leftIdx;
    rightIdx = rightIdx >= queue.length ? queue.length - 1 : rightIdx;
    const indices = [leftIdx];
    rightIdx !== leftIdx && indices.push(rightIdx);
    // must kill own family if no valid target, but won't kill himself
    // TODO: Check the rule!!
    const targets = indices.filter((target) => target !== qri);
    return {
      targets,
      targetsNoneValid: targets.length === 0,
    };
  },
  getAction: (heirCard: Card, queue: Card[][], qri: number) => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceChange prop if this occurs
    return {
      type: CARD_EFFECTS.ELIMINATE,
      influenceChange: 1,
    };
  },
  getDiscardAfterResolution: () => false,
  getActionOnElimination: () => null,
};
