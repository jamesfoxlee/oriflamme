import React from "react";
import { User, GameState, Card, MessageType } from "../../types/index";
import Messages from "../../organisms/Messages/Messages";
import Status from "../../atoms/Status/Status";

type Props = {
  gameState: GameState;
  messages: MessageType[];
  selectedPlayerCard: Card;
  user: User;
};

export default function SideBar({
  gameState,
  messages,
  selectedPlayerCard,
  user,
}: Props) {
  return (
    <div className="game__sidebar">
      <div className="game__status">
        <Status
          gameState={gameState}
          selectedPlayerCard={selectedPlayerCard}
          user={user}
        />
      </div>
      <div className="game__messages">
        <Messages messages={messages} players={gameState.players} />
      </div>
    </div>
  );
}
