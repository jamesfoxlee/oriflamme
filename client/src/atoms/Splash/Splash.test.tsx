import { render, screen } from "@testing-library/react";
import Splash from "./Splash";
import * as React from "react";
import userEvent from "@testing-library/user-event";

describe("Splash component", () => {
  let toogle = true;
  test("should match the snapshot", () => {
    const { container } = render(
      <Splash
        show={toogle}
        dismiss={() => {
          toogle = !toogle;
        }}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test("should hide the modal when clicking the button", async () => {
    const { getByText } = render(
      <div>
        <Splash
          show={toogle}
          dismiss={() => {
            toogle = !toogle;
          }}
        />{" "}
        <div>{"Hello"}</div>
      </div>
    );
    const testButton = screen.getByRole("button", { name: /play/i });
    await userEvent.click(testButton);
    expect(getByText("Hello")).toBeTruthy();
  });
});
