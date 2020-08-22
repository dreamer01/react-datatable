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

const rowData = [
  { id: 1, name: "A", age: 10 },
  { id: 2, name: "B", age: 10 },
];

test("render DataTable component", () => {
  const { getAllByRole, rerender } = render(
    <DataTable columns={columnsConfig} />
  );

  // Since two theads are rendered
  expect(getAllByRole("columnheader").length / 2).toBe(
    columnsConfig.length + 1
  );

  const rowsBeforeData = getAllByRole("row");

  rerender(<DataTable columns={columnsConfig} rows={rowData} />);
  expect(getAllByRole("row").length).toBe(
    rowsBeforeData.length + rowData.length - 1 // Minus 1 for Not Found Row
  );
});
