import React from 'react'
import "./navbar.css";
import { useNavigate } from 'react-router';


const LoginNavbar = () => {

  const navigate = useNavigate();

  const handelClick=()=> {
    navigate('/login')
  }

  return (
    <div>
      <nav className='nav_container'>
        <ul>
          <li className='nav_container_li_1'><a className='nav_container_li_1_a' href='/'>Attendance WebApp</a></li>
        </ul>
        <ul>
          {/* <li onClick={handelClick} className='nav_container_li_2'>Log In</li> */}
        </ul>
      </nav>
    </div>
  )
}

export default LoginNavbar