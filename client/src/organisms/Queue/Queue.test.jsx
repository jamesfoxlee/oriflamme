//ERROR BECAUSE OF MODALS

// /**
//  * @jest-environment jsdom
//  */
// import Queue from "./Queue";
// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import { SocketProvider, UserProvider } from "../../context/socket.context";
// import { socket } from "../../App.js";
// import * as Modal from "react-modal";
// import { createNoSubstitutionTemplateLiteral } from "typescript";

// const mockGameState = {
//   abilityInterrupted: false,
//   activePlayerId: "4qDQfUVnPDaLv-1QAAAB",
//   numPlayers: 1,
//   phase: "planning",
//   planningPhasePlayed: 0,
//   players: {
//     "4qDQfUVnPDaLv-1QAAAB": {
//       color: "red",
//       discardPile: [],
//       hand: (7)[
//         ("archer",
//         "assassination",
//         "conspiracy",
//         "heir",
//         "lord",
//         "soldier",
//         "spy")
//       ],
//       id: "4qDQfUVnPDaLv-1QAAAB",
//       imageUrl:
//         "https://i.pinimg.com/originals/7a/ae/c8/7aaec855ca19276f3884f6b7655fdc33.jpg",
//       influence: 1,
//       name: "kljhhjg",
//       roomId: "cb6dd7c0-4a2d-11ec-9e6a-b9aa4c89cb1a",
//     },
//   },
//   queue: [],
//   queueResolutionIndex: 0,
//   queueTargets: [],
//   roomId: null,
//   round: 1,
//   targets: [],
//   targetsNoneValid: false,
//   targetsSelf: false,
//   targettedIndex: null,
//   turnOrder: ["4qDQfUVnPDaLv-1QAAAB"],
//   turnOrderIndex: 0,
// };

// const mockSelectedPlayedCard = {
//   id: "4qDQfUVnPDaLv-1QAAAB",
//   name: "Assassination",
//   text: "Elimate any card in the Queue. Discard Assassination.",
// };

// const mockSetSelectedPlayerCard = jest.fn();

// const user = { id: "4qDQfUVnPDaLv-1QAAAB", name: "John Doe" };
// const setUser = jest.fn();
// ReactModal.setAppElement(document.createElement("div"));

// jest.spyOn(Modal, "setAppElement").mockImplementation(() => jest.fn());

// test("reveals queue card on hover", () => {
//   const { getByText, getByTestId } = render(
//     <SocketProvider value={socket}>
//       <UserProvider>
//         <Queue
//           gameState={mockGameState}
//           selectedPlayerCard={mockSelectedPlayedCard}
//           setSelectedPlayerCard={mockSetSelectedPlayerCard}
//         />
//       </UserProvider>
//     </SocketProvider>
//   );

//   const card = getByTestId("queue-card");
//   fireEvent.mouseEnter(card);
//   const cardName = getByText("Assassination");
//   const cardText = getByText(
//     "Elimate any card in the Queue. Discard Assassination."
//   );

//   expect(cardName).toBeDefined();
//   expect(cardText).toBeDefined();
// });
