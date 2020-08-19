import React from "react";
import { render } from "@testing-library/react";

import DataTable from "./index";

test("render DataTable component", () => {
  const { getByText } = render(<DataTable />);
  getByText(/rendering datatable/i);
});
