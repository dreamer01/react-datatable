import React, { useState, useEffect, useCallback, useMemo } from "react";

import debounce from "../../utils/debounce";
import DataTable from "../../components/DataTable";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(
    debounce(() => {
      fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20&q=${search}`
      )
        .then((res) => res.json())
        .then((newData) => {
          if (page === 1) setData(newData);
          else setData((data) => [...data, ...newData]);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, 1000)
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (page === 1) fetchData();
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      setLoading(true);
      setPage((page) => page + 1);
    }
  }, [loading]);

  const handleRowClick = (...args) => console.log("Row Clicked :: ", ...args);

  const handleSelection = useCallback(
    (selected) => console.log("Selected Rows :: ", selected),
    []
  );

  return (
    <div className="wrapper">
      <div>
        <input
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search Here..."
        />
      </div>
      <DataTable
        columns={columnsConfig}
        rows={data}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelection}
        hasMore={true}
        loadMore={handleLoadMore}
      />
    </div>
  );
}

export default App;
