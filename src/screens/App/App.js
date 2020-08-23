import React, { useState, useEffect, useCallback } from "react";

import DataTable from "../../components/DataTable";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos`)
      .then((res) => res.json())
      .then((newData) => {
        setData(newData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
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
