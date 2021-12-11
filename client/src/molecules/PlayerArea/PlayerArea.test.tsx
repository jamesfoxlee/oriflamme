import PlayerArea from "./PlayerArea";
import { Props } from "./PlayerArea";
import "@testing-library/jest-dom";
import { UserContext } from "../../context/user.context";

import React from "react";
import { render } from "@testing-library/react";

let props: Props;
beforeEach(() => {
  props = {
    activePlayerId: "n5EKpbcQWdoDvn8lAAAF",
    phase: "planning",
    players: {
      n5EKpbcQWdoDvn8lAAAF: {
        color: "red",
        discardPile: ["assassination", "conspiracy"],
        hand: ["archer", "assassination", "conspiracy"],
        id: "n5EKpbcQWdoDvn8lAAAF",
        imageUrl:
          "https://i.pinimg.com/originals/7a/ae/c8/7aaec855ca19276f3884f6b7655fdc33.jpg",
        influence: 1,
        name: "JFK",
        roomId: "3b805350-4897-11ec-af1c-139452ba1c4c",
      },
    },
  };
});

test("PlayerArea element should instantiate correct components", () => {
  const { getAllByTestId } = render(
    <UserContext.Provider value={[{ id: "n5EKpbcQWdoDvn8lAAAF" }]}>
      <PlayerArea {...props} />
    </UserContext.Provider>
  );
  expect(getAllByTestId("player")).not.toHaveLength(0);
});
