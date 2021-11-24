import { CARD_EFFECTS } from '../config/game.constants';
import { CardDetail } from "../types/index";
import { Card } from '../types/index';

export const ambush: CardDetail = {
  id: 'ambush',
  name: 'Ambush',
  text: 'If eliminated by an opponent\'s character, discard the attacker and gain 4 influence. If you reveal it yourself, gain 1 influence. Discard Ambush.',
  getInfluenceGainOnReveal: () => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return 1;
  },
  getTargets: () => {
    // return an empty array if no targets or "self-target" e.g. such as Heir, Lord
    // this enables card highlighting in UI etc
    return {
      targetsNothing: true, // only if revealed by owner, everything happens on elimination...
    }
  },
  getAction: () => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceChange prop if this occurs
    return {
      type: CARD_EFFECTS.NONE,
    }
  },
  getDiscardAfterResolution: () => true,
  getActionOnElimination: (ambushCard: Card, queue: Card[][], qri: number) => {
    const eliminatingCard = queue[qri][0];
    if (eliminatingCard.id === 'assassination') {
      return null;
    } else {
      ambushCard.revealed = true;
      return {
        type: CARD_EFFECTS.ELIMINATE_ATTACKER,
        influenceChange: 4
      }
    }
  },
};
