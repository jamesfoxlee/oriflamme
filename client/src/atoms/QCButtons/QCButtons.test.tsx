import QCButtons from "./QCButtons";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

test("passes text to button", () => {
  const { getByText } = render(<QCButtons text="test" />);
  const text = getByText("test");
  expect(text).toBeDefined();
});

test("calls given function properly", () => {
  const mockFunction = jest.fn();
  const { getByTestId } = render(<QCButtons onYes={mockFunction} />);
  const button = getByTestId("onYes-button");
  fireEvent.click(button);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});
test("calls given function properly", () => {
  const mockFunction = jest.fn();
  const { getByTestId } = render(<QCButtons onNo={mockFunction} />);
  const button = getByTestId("onNo-button");
  fireEvent.click(button);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});
