import React from "react";
import { Route, Routes } from "react-router";
import Login from "./components/Admin/LoginRegister/Login";
import SignUp from "./components/Admin/LoginRegister/SignUp";
import Attendance from "./components/Attendance/Attendance";
import Home from "./components/Home/Home";
import Print from "./components/Print/Print";
import RegisterDB from "./components/RegisterDB/RegisterDB";
import AdminHome from "./components/Admin/AdminHome/AdminHome"
import AddStudents from "./components/Admin/Add Students/AddStudents";
import AddYear from "./components/Admin/Add Year/AddYear";
import StudentDB from "./components/Admin/StudentDB/StudentDB";
import AttendanceDB from "./components/Admin/AttendanceDB/AttendanceDB";
import AddSubject from "./components/Admin/Add Subject/AddSubject";


function App() {



  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/registerdb" element={<RegisterDB />} />
        <Route path="/print" element={<Print />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/addstudent" element={<AddStudents />} />
        <Route path="/addyear" element={<AddYear />} />
        <Route path="/studentDB" element={<StudentDB />} />
        <Route path="/attendanceDB" element={<AttendanceDB />} />
        <Route path="/addsubject" element={<AddSubject />} />
      </Routes>
    </div>
  );
}

export default App;
