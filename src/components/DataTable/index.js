import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./table.css";
import Checkbox from "../Checkbox";

function DataTable({ columns, rows, onRowClick, onSelectionChange }) {
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    onSelectionChange(selectedRows);
  }, [onSelectionChange, selectedRows]);

  const handleSelect = (e, value) => {
    if (value === "All") {
      if (e.target.checked) setSelectedRows("All");
      else setSelectedRows([]);
    } else if (e.target.checked) {
      if (selectedRows === "All") setSelectedRows([value]);
      else setSelectedRows((selectedRows) => [...selectedRows, value]);
    } else
      setSelectedRows((selectedRows) =>
        selectedRows.filter((rowId) => rowId !== value)
      );
  };

  const renderColumns = (col) => (
    <th
      key={col.id}
      style={{ width: col.width || `${90 / (columns.length + 1)}%` }}
    >
      {col.label}
    </th>
  );

  const renderRows = (row, i) => (
    <tr
      className="data-row"
      onClick={(e) => {
        console.log(e.eventPhase);
        onRowClick(row, i);
      }}
      key={row.id}
    >
      <td className="center">
        <Checkbox
          checked={selectedRows.includes(`${row.id}`)}
          value={`${row.id}`}
          onChange={handleSelect}
          onClick={(e) => e.stopPropagation()} // Avoids Row Click Event
        />
      </td>
      {columns.map((col) => (
        <td className={col.numeric ? "numeric-col" : ""} key={col.id}>
          {row[col.id]}
        </td>
      ))}
    </tr>
  );

  return (
    <table>
      <tbody>
        <tr>
          <th className="select-col">
            <Checkbox
              checked={selectedRows === "All"}
              value="All"
              onChange={handleSelect}
            />
          </th>
          {columns.length > 0 && columns.map(renderColumns)}
        </tr>
        {rows.length > 0 ? (
          rows.map(renderRows)
        ) : (
          <tr>
            <td className="not-found" colSpan={columns.length + 1}>
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  onRowClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
};

DataTable.defaultProps = {
  columns: [],
  rows: [],
  onRowClick: () => {},
  onSelectionChange: () => {},
};

export default DataTable;
