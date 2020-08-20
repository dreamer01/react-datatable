import React from "react";

import DataTable from "../../components/DataTable";
import "./App.css";

function App() {
  const columnsConfig = [
    {
      id: "name",
      label: "Name",
      numeric: false,
    },
    {
      id: "age",
      label: "Age",
      numeric: true,
      width: "100px",
    },
  ];

  const data = [
    {
      id: 1,
      name: "Ajay",
      age: 20,
    },
    {
      id: 2,
      name: "Anil",
      age: "26",
    },
  ];

  const handleRowClick = (...args) => {
    console.log(...args);
  };

  return (
    <div className="wrapper">
      <DataTable
        columns={columnsConfig}
        rows={data}
        onRowClick={handleRowClick}
      />
    </div>
  );
}

export default App;
