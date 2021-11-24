import React, { useContext } from "react";
import { Players } from "../../types/index";
import "./OpponentArea.css";
import Player from "../Player/Player";
import { UserContext } from "../../context/user.context";

export type Props = {
  activePlayerId: string;
  players: Players;
  turnOrder: string[];
};

export default function OpponentArea({
  activePlayerId,
  players,
  turnOrder,
}: Props) {
  const [user] = useContext(UserContext);

  const userIdx = turnOrder.indexOf(user.id);
  const opponentOrder = turnOrder
    .slice(userIdx + 1)
    .concat(turnOrder.slice(0, userIdx));
  const opponents = opponentOrder.map((opponentId) => {
    return players[opponentId];
  });

  return (
    <div className="opponent-area">
      {opponents.map((opponent, idx) => {
        const isActivePlayer = opponent.id === activePlayerId;
        return (
          <div className="opponent__wrapper" key={`opponent-${idx}`}>
            <Player isActivePlayer={isActivePlayer} player={opponent} />
          </div>
        );
      })}
    </div>
  );
}
