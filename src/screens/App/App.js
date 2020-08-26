/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from "react";

import debounce from "../../utils/debounce";
import DataTable from "../../components/DataTable";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const fetchData = useCallback(
    debounce(() => {
      setLoading(true);
      const param = filter ? filter : "q";
      fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20&${param}=${search}`
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
  }, [page]);

  useEffect(() => {
    if (page === 1) fetchData();
    else setPage(1);
  }, [search]);

  useEffect(() => {
    if (search) setSearch("");
    else fetchData();
  }, [filter]);

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
      id: "url",
      label: "Image URL",
      numeric: false,
    },
  ];

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setSearch("");
  };

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
      <div className="search-view">
        <select className="form-ele" value={filter} onChange={handleFilter}>
          <option value="">Filter</option>
          <option value="title">Title</option>
          <option value="url">URL</option>
        </select>
        <input
          className="form-ele"
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

      {// Showing Loading spinner for first page
      loading && page === 1 && (
        <div className="spinner-view">
          <div className="spinner spinner-circle" />
        </div>
      )}
    </div>
  );
}

export default App;
