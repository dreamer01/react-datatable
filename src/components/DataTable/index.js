import React from "react";
import PropTypes from "prop-types";

import "./table.css";

function DataTable({ columns, rows, onRowClick, onSelectionChange }) {
  const renderColumns = (col) => (
    <th
      key={col.id}
      style={{ width: col.width || `${100 / (columns.length + 1)}%` }}
    >
      {col.label}
    </th>
  );

  const renderRows = (row) => {};

  return (
    <table>
      <tbody>
        <tr>
          {columns.length > 0 && columns.map(renderColumns)}
          <th>Select</th>
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
