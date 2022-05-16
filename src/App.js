import React from "react";
import { Route, Routes } from "react-router";
import Attendance from "./components/Attendance/Attendance";
import Home from "./components/Home/Home";
import Print from "./components/Print/Print";
import RegisterDB from "./components/RegisterDB/RegisterDB";

function App() {



  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/registerdb" element={<RegisterDB />} />
        <Route path="/print" element={<Print />} />
      </Routes>
    </div>
  );
}

export default App;
