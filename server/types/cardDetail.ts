const { CARD_EFFECTS } = require("../config/game.constants");
import { Card } from "../types/index";

export type CardDetail = {
  id: string;
  name: string;
  text: string;
  getInfluenceGainOnReveal: (_: Card, queue: Card[][], qri: number) => number;
  getTargets: (
    card: Card,
    queue: Card[][],
    qri: number
  ) => {
    targets?: number[];
    targetsNothing?: boolean;
    targetsNoneValid?: boolean;
    targetsSelf?: boolean;
  };
  getAction: (
    card: Card,
    queue: Card[][],
    qri: number
  ) => {
    type: string;
    influenceChange?: number;
  };
  getDiscardAfterResolution: (
    card: Card,
    queue: Card[][],
    qri: number
  ) => boolean;
  getActionOnElimination: (
    card: Card,
    queue: Card[][],
    qri: number
  ) => null | {
    type: string;
    influenceChange: number;
  };
};
