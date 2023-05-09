import { render } from "@testing-library/react";
import Login from "./login";
import React from "react";
describe("Login", () => {
  test("Should not render spinner and error on start", () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);
  });
});
