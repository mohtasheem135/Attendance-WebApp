import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import "./adminHome.css";
import { useNavigate } from 'react-router';

const AdminHome = () => {

  const navigate = useNavigate();

  const handelClick1 = (e) => {
    navigate('/addstudent')
  }

  const handelClick2 = (e) => {
    navigate('/addyear')
  }

  const handelClick3 = (e) => {
    navigate('/studentDB')
  }

  const handelClick4 = (e) => {
    navigate('/attendanceDB')
  }

  const handelClick5 = (e)=>{
    navigate('/addsubject')
  }


  return (
    <div>
      <AdminNavbar />
      <h1>Admin Home</h1>
      <div className='admin_home_btn_container'>
        <button onClick={handelClick1} className='admin_home_btn_container_btn_1'>Add Students</button>
        <button onClick={handelClick2} className='admin_home_btn_container_btn_1'>Add Year</button>
        <button onClick={handelClick3} className='admin_home_btn_container_btn_1'>Student DB</button>
        <button onClick={handelClick4} className='admin_home_btn_container_btn_1'>Attendance DB</button>
        <button onClick={handelClick5} className='admin_home_btn_container_btn_1'>Add Subject</button>
      </div>
    </div>
  )
}

export default AdminHome