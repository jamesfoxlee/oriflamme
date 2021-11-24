export type Card = {
  id: string;
  name: string;
  text: string;
  revealed?: boolean;
  influence: number;
  ownerId: string;
  ownerColor: string;
};
