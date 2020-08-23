import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

const onRowClick = jest.fn();
const onSelectionChange = jest.fn();

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

test("render DataTable and prop function onRowClick is invoked", () => {
  const { getAllByRole } = render(
    <DataTable
      columns={columnsConfig}
      rows={rowData}
      onRowClick={onRowClick}
      onSelectionChange={onSelectionChange}
    />
  );

  userEvent.click(getAllByRole("row")[2]); // First row with data
  expect(onRowClick).toHaveBeenCalledTimes(1);
  expect(onRowClick).toHaveBeenCalledWith(rowData[0], 0);
});

test("render DataTable and prop function onSelectionChange is invoked", () => {
  const { getAllByRole } = render(
    <DataTable
      columns={columnsConfig}
      rows={rowData}
      onSelectionChange={onSelectionChange}
    />
  );

  userEvent.click(getAllByRole("checkbox")[0]); // Header Checkbox
  expect(onSelectionChange).toHaveBeenCalledWith("All");

  userEvent.click(getAllByRole("checkbox")[1]); // First row with data
  expect(onSelectionChange).toHaveBeenCalledWith(["1"]);
});
