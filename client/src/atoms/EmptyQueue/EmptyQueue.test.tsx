import EmptyQueue from "./EmptyQueue";
import React from "react";
import { render } from "@testing-library/react";

test("renders header properly", () => {
  const { getByTestId } = render(<EmptyQueue />);
  const header = getByTestId("empty-queue-header");
  expect(header).toBeDefined();
});

test("renders correct amount of phantom cards", () => {
  const { getAllByTestId } = render(<EmptyQueue />);
  const cards = getAllByTestId("empty-queue-card");
  expect(cards.length).toBe(3);
});

test("renders instructions properly", () => {
  const { getByTestId } = render(<EmptyQueue />);
  const instructions = getByTestId("empty-queue-instructions");
  expect(instructions).toBeDefined();
});
