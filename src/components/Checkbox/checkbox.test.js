import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Checkbox from "./index";

const onChange = jest.fn();

test("render Checkbox component", () => {
  const { getByRole } = render(<Checkbox onChange={onChange} />);
  userEvent.click(getByRole("checkbox"));
  expect(onChange).toHaveBeenCalledTimes(1);
});
