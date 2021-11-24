import { Card, Room } from "./index";

export type GameManager = {
  initialise: (room: Room) => void;
  getGameState: () => void;
  cardWasPlayed: (card: Card, position: number) => void;
  cardWasNotRevealed: (qri: number) => void;
  cardWasRevealed: (qri: number) => void;
  targetWasConfirmed: (index: number) => void;
  targetSelfWasConfirmed: () => void;
  noValidTargetWasConfirmed: () => void;
  discardWasConfirmed: (index: number) => void;
  interruptWasConfirmed: () => void;
}