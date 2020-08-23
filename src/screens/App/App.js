import React, { useState, useEffect, useCallback } from "react";

import DataTable from "../../components/DataTable";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const fetchData = useCallback(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  const columnsConfig = [
    {
      id: "id",
      label: "Id",
      numeric: true,
      width: 20,
    },
    {
      id: "title",
      label: "Title",
      numeric: false,
    },
    {
      id: "thumbnailUrl",
      label: "Image",
      numeric: false,
    },
  ];

  const handleRowClick = (...args) => console.log("Row Clicked :: ", ...args);

  const handleSelection = useCallback(
    (selected) => console.log("Selected Rows :: ", selected),
    []
  );

  return (
    <div className="wrapper">
      <DataTable
        columns={columnsConfig}
        rows={data}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelection}
      />
    </div>
  );
}

export default App;
