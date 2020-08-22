import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders App page", () => {
  const { getAllByRole } = render(<App />);
  getAllByRole("table");
});
