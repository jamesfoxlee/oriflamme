export type Player = {
  color: string;
  discardPile: string[];
  hand: string[];
  id: string;
  imageUrl: string;
  influence: number;
  name: string;
  roomId: string;
  socketId?: string;
};
