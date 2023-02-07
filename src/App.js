import React from "react";
import Dashboard from "./components/Dashboard";
import "./styles.css";
import Authentication from "./components/authentication/Authentication";
import { Route, Routes } from "react-router-dom";

function App() {
    /*
  Alcuni codici fiscali pazienti:

TRRVLA91M13Z404A
MMRMRA89L29Z404B
CNNCLD87A53Z404C     */

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
