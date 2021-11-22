import Loading from "./Loading";
import React from "react";
import { render } from "@testing-library/react";

test("renders that the message is passed correctly", () => {
  const { getByText } = render(<Loading message={"welcome"} />);
  const message = getByText("welcome");
  expect(message).toBeDefined();
});

test("renders a default message when no message is passed", () => {
  const { getByText } = render(<Loading />);
  const message = getByText("Loading");
  expect(message).toBeDefined();
});
