import React from "react";
import { render, waitForElement } from "@testing-library/react";
import App from "./App";

test("on render App page make request", async () => {
  const { getByText } = render(<App />);
  await waitForElement(() =>
    getByText(/accusamus beatae ad facilis cum similique qui sunt/i)
  );
});
