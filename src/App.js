import React from "react";
import Dashboard from "./components/Dashboard";
import "./styles.css";
import Authentication from "./components/authentication/Authentication";
import { Route, Routes } from "react-router-dom";

function App() {
    /*
  Alcuni codici fiscali pazienti:

BREKRY44D60Z536C 
PACAUG57M23Z536Q   */

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
