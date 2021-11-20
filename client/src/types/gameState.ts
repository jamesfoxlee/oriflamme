import { Players, Card } from './index';

export type GameState = {
  abilityInterrupted: boolean;
  activePlayerId: string;
  numPlayers: number;
  phase: string;
  planningPhasePlayed: number;
  players: Players;
  queue: Card[][];
  queueResolutionIndex: number;
  queueTargets?: [];
  resolvingCardToBeDiscarded?: boolean;
  roomId: null;
  round: number;
  targets?: [];
  targetsNoneValid: boolean;
  targetsNothing?: boolean;
  targetsSelf: boolean;
  targettedIndex: number | null;
  turnOrder: string[];
  turnOrderIndex: number;
};