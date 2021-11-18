type Card = {
  id: string;
  name: string;
  revealed: boolean;
}

export type Props = { 
  gameState: {
    abilityInterrupt: string,
    activePlayerId: number,
    phase: string,
    players: {
      name: string;
    }[],
    queue: Card[][],
    queueResolutionIndex: number,
    resolvingCardToBeDiscarded: string,
    targetsNoneValid: string,
  };
  selectedPlayerCard: Card;
  user: {
    id: number;
  };
}