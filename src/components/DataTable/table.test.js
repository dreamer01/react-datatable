import React from "react";
import { render } from "@testing-library/react";

import DataTable from "./index";

const columnsConfig = [
  {
    id: "name",
    label: "Name",
    numeric: false,
  },
  {
    id: "age",
    label: "Age",
    numeric: true,
    width: "100px",
  },
];

test("render DataTable component", () => {
  const { getAllByRole } = render(<DataTable columns={columnsConfig} />);
  expect(getAllByRole("columnheader").length).toBe(columnsConfig.length + 1);
  getAllByRole("row");
});
