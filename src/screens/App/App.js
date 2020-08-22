import React, { useState, useEffect, useCallback } from "react";

import DataTable from "../../components/DataTable";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`)
      .then((res) => res.json())
      .then((newData) => {
        setData((data) => [...data, ...newData]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    !loading && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, page]);

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

  const handleRowClick = (...args) => console.log("Row Clicked :: ", ...args);

  const handleSelection = (selected) =>
    console.log("Selected Rows :: ", selected);

  return (
    <div className="wrapper">
      <DataTable
        columns={columnsConfig}
        rows={data}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelection}
        hasMore={true}
        loadMore={() => setPage((page) => page + 1)}
      />
    </div>
  );
}

export default App;
