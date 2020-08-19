import React from "react";
import PropTypes from "prop-types";

import "./table.css";

function DataTable({ columns, rows, onRowClick, onSelectionChange }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>Rendering DataTable</td>
        </tr>
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
