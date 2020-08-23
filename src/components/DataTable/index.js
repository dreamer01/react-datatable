import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import debounce from "../../utils/debounce";
import Checkbox from "../Checkbox";
import "./table.css";

function DataTable({ columns, rows, onRowClick, onSelectionChange }) {
  const [loading, setLoading] = useState(false);
  const [offSet, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const start = offSet * 20;
    const end = start + 21;
    setData(rows.slice(start, end));
  }, [offSet, rows]);

  useEffect(() => {
    onSelectionChange(selectedRows);
  }, [onSelectionChange, selectedRows]);

  const handleLoadMore = debounce(() => {
    const { scrollTop, scrollHeight } = document.getElementById("scroll-view");
    console.log(scrollTop);
    if (scrollTop > scrollHeight - document.body.offsetHeight) {
      setLoading(true);

      setOffset((offset) => offset + 1);
    } else if (0 >= scrollTop && scrollTop < 200) {
      setLoading(true);

      setOffset((offset) => offset && offset - 1);
    }
  }, 100);

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
      style={{ width: col.width || `${100 / (columns.length + 1)}%` }}
    >
      {col.label}
    </th>
  );

  const renderRows = (row, i) => (
    <tr className="data-row" onClick={(e) => onRowClick(row, i)} key={row.id}>
      <td className="select-col">
        <Checkbox
          checked={selectedRows.includes(`${row.id}`)}
          value={`${row.id}`}
          onChange={handleSelect}
          onClick={(e) => e.stopPropagation()} // Avoids Row Click Event
        />
      </td>
      {columns.map((col) => (
        <td key={col.id} className={col.numeric ? "numeric-col" : ""}>
          {row[col.id]}
        </td>
      ))}
    </tr>
  );

  return (
    <div style={{ width: "80%" }}>
      <div>
        <table>
          <thead>
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
          </thead>
        </table>
      </div>
      <div id="scroll-view" onScroll={handleLoadMore}>
        <table>
          <thead>
            <tr>
              <th className="select-col empty-row "></th>
              {columns.length > 0 &&
                columns.map((col) => (
                  <th
                    className="empty-row "
                    key={col.id}
                    style={{
                      width: col.width || `${100 / (columns.length + 1)}%`,
                    }}
                  ></th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map(renderRows)
            ) : (
              <tr>
                <td className="not-found" colSpan={columns.length + 1}>
                  No Data Found
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td className="not-found" colSpan={columns.length + 1}>
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
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
