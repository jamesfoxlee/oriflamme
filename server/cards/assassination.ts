const { CARD_EFFECTS } = require('../config/game.constants');
import { CardDetail } from "../types/index";
import { Card } from '../types/index';

export const assassination: CardDetail = {
  id: 'assassination',
  name: 'Assassination',
  text: "Elimate any card in the Queue. Discard Assassination.",
  getInfluenceGainOnReveal: (assassinationCard: Card) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return assassinationCard.influence;
  },
  getTargets: (assassinationCard: Card, queue: Card[][], qri: number) => {
    // return an empty array if no targets or "self-target" e.g. such as Heir, Lord
    // this enables card highlighting in UI etc
    const allIndices = queue.map((_, idx) => idx);
    const targets = allIndices.filter(target => target !== qri); // exclude Assassination
    return {
      targets,
      targetsNoneValid: targets.length === 0,
    }
  },
  getAction: () => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceChange prop if this occurs
    return {
      type: CARD_EFFECTS.ELIMINATE,
      influenceChange: 1
    }
  },
  getDiscardAfterResolution: () => true,
  getActionOnElimination: () => null,
};
