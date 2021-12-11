const { CARD_EFFECTS } = require("../config/game.constants");
import { CardDetail } from "../types/index";
import { Card } from "../types/index";

export const heir: CardDetail = {
  id: "heir",
  name: "Heir",
  text: "If there is no other card revealed with the same name, gain 2 influence.",
  getInfluenceGainOnReveal: (heirCard: Card) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return heirCard.influence;
  },
  getTargets: () => {
    // return an empty array if no targets at all
    // return array with index of self if it's a "self-target" e.g. inf gain such as Heir, Lord
    // this enables card highlighting in UI etc
    return {
      targetsSelf: true,
    };
  },
  getAction: (heirCard: Card, queue: Card[][], qri: number) => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceChange prop if this occurs

    const otherHeirs = queue
      .map((stack) => {
        // check top card only - we can ignore revealed heirs that are covered in a Stack
        return stack[0];
      })
      .filter((queueCard: Card, idx: number) => {
        return (
          queueCard.revealed && idx !== qri && queueCard.name === heir.name
        );
      });
    const influenceChange = otherHeirs.length === 0 ? 2 : 0;

    return {
      type: CARD_EFFECTS.GAIN_INFLUENCE,
      influenceChange,
    };
  },
  getDiscardAfterResolution: () => false,
  getActionOnElimination: () => null,
};
