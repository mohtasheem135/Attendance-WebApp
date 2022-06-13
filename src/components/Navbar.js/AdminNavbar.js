import React from 'react'
import "./navbar.css";
import { useNavigate } from 'react-router';


const AdminNavbar = () => {

  const navigate = useNavigate();

  const handelClick=()=> {
    navigate('/login')
  }

  const handellog=() => {
      localStorage.setItem('username', "");
      localStorage.setItem('year', "");
      navigate('/')
  }

  return (
    <div>
      <nav className='nav_container'>
        <ul>
          <li className='nav_container_li_1'><a className='nav_container_li_1_a' href='/home'>Attendance WebApp</a></li>
        </ul>
        <ul className='nav_container_ul_2'>
          <li onClick={handelClick} className='nav_container_li_2 nav_container_li_2_admin'>{localStorage.getItem('username')}</li>
          <li onClick={handellog} className='nav_container_li_2'>Log Out</li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminNavbar