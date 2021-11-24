

import Nav from "./Nav";
import React from "react";
import { render } from "@testing-library/react";
import { UserProvider } from "../../context/user.context";

const user = { id: 1, name: "John Doe" };
const noUser = { id: 1, name: "" };
const setUser = jest.fn();

test("renders logo message properly", () => {
  const { getByText } = render(
    <UserProvider value={[user, setUser]}>
      <Nav />
    </UserProvider>
  );
  const message = getByText("Oriflamme");

  expect(message).toBeDefined();
});
test("renders username properly when one exists in context", () => {
  const { getByText } = render(
    <UserProvider value={[user, setUser]}>
      <Nav />
    </UserProvider>
  );
  const name = getByText("John Doe");
  expect(name).toBeDefined();
});

test("renders string Guest when no name is passed", () => {
  const { getByText } = render(
    <UserProvider value={[noUser, setUser]}>
      <Nav />
    </UserProvider>
  );

  const name = getByText("Guest");

  expect(name).toBeDefined();
});
