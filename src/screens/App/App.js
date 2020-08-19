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

  return (
    <div className="wrapper">
      <DataTable columns={columnsConfig} />
    </div>
  );
}

export default App;
