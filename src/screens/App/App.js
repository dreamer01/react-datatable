import React, { useState, useEffect } from "react";

import DataTable from "../../components/DataTable";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const columnsConfig = [
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

  const handleRowClick = (...args) => {
    console.log(...args);
  };

  const handleSelection = (selected) => console.log(selected);

  return (
    <div className="wrapper">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={columnsConfig}
          rows={data}
          onRowClick={handleRowClick}
          onSelectionChange={handleSelection}
        />
      )}
    </div>
  );
}

export default App;
