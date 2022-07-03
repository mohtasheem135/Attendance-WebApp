import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import "./adminHome.css";
import { useNavigate } from 'react-router';
import img_1 from "../../../Resources/img_2.jpg"

const AdminHome = () => {

  const navigate = useNavigate();

  const handelClick0 = (e) => {
    navigate('/add')
  }

  const handelClick3 = (e) => {
    navigate('/studentDB')
  }

  const handelClick4 = (e) => {
    navigate('/attendanceDB')
  }

  const handelClick8 = (e)=>{
    navigate('/attendancePage')
  }

 


  return (
    <div>
      <AdminNavbar />
      <div className='admin_home_btn_container'>
        <button onClick={handelClick8} className='admin_home_btn_container_btn_1'>Attendance</button>
        <button onClick={handelClick0} className='admin_home_btn_container_btn_1'>Add</button>
        <button onClick={handelClick3} className='admin_home_btn_container_btn_1'>Student DB</button>
        <button onClick={handelClick4} className='admin_home_btn_container_btn_1'>Attendance DB</button>
      </div>
      <img className='adminhome-img-1' src={img_1} />
    </div>
  )
}

export default AdminHome