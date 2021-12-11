import { render, screen } from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "regenerator-runtime/runtime";

describe("Button component", () => {
  const btnFunc = jest.fn();
  test("should call a function when clicked", async () => {
    render(
      <Button
        buttonStyle={""}
        extraStyles={{}}
        disabled={false}
        text={"hello"}
        onClick={btnFunc}
      />
    );
    const testButton = screen.getByRole("button", { name: /hello/i });
    await userEvent.click(testButton);
    expect(btnFunc).toHaveBeenCalled();
  });
  test("should have some text value", () => {
    render(
      <Button
        buttonStyle={""}
        extraStyles={{}}
        disabled={false}
        text={"hello"}
        onClick={btnFunc}
      />
    );
    const testButton = screen.getByRole("button", { name: /hello/i });
    expect(testButton).toHaveTextContent("hello");
  });
  test("should not work if disabled", async () => {
    const btnFunc = jest.fn();
    render(
      <Button
        buttonStyle={""}
        extraStyles={{}}
        disabled={true}
        text={"hello"}
        onClick={btnFunc}
      />
    );
    const testButton = screen.getByRole("button", { name: /hello/i });
    await userEvent.click(testButton);
    expect(btnFunc).toHaveBeenCalledTimes(0);
  });
});
