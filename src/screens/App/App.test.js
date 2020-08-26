import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import App from "./App";

test("on render App page make request", async () => {
  const { getByText } = render(<App />);
  await waitForElement(() =>
    getByText(/accusamus beatae ad facilis cum similique qui sunt/i)
  );
});

test("render data search string", async () => {
  const { getByText, getByRole } = render(<App />);
  fireEvent.change(getByRole("searchbox"), { target: { value: "rep" } });
  await waitForElement(() =>
    getByText(/reprehenderit est deserunt velit ipsam/i)
  );
});
