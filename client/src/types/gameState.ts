import { Players, QCard } from "./index";

export type GameState = {
  abilityInterrupted: boolean;
  activePlayerId: string;
  numPlayers: number;
  phase: string;
  planningPhasePlayed: number;
  players: Players;
  queue: QCard[][];
  queueResolutionIndex: number;
  queueTargets?: [];
  resolvingCardToBeDiscarded?: boolean;
  roomId: null;
  round: number;
  targets?: any[];
  targetsNoneValid: boolean;
  targetsNothing?: boolean;
  targetsSelf: boolean;
  targettedIndex: number | null;
  turnOrder: string[];
  turnOrderIndex: number;
};
