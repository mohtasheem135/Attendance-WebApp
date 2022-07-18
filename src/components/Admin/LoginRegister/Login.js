import React, { useEffect, useState } from 'react';
import LoginNavbar from '../../Navbar.js/LoginNavbar';
import "./loginSignup.css";
import { useNavigate } from 'react-router';
import fireDB from '../../../firebase';

const Login = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({});

  const values = {
    userName: '',
    email: '',
    password: '',
  }

  const [initialState, setInitialState] = useState({});
  const { userName, email, password } = initialState;

  const handelChange = (e) => {
    let { name, value } = e.target;
    setInitialState({
      ...initialState,
      [name]: value,
    })

    fireDB.database().ref().child(`Attendance/Admin/${initialState.userName}`).on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    });
  }


  const handelClick = (e) => {
    e.preventDefault()
    console.log(data)

    if (data.password === initialState.password && data.email === initialState.email) {
      localStorage.setItem('username', data.userName)
      navigate('/home');
    } else {
      alert("Email or Password is incorrect ..... Try Again!!!");
      setInitialState({
        userName: '',
        email: '',
        password: ''
      })
    }

  }

  // const handelClick_1 =() => {
  //   navigate('/register')
  // }


  return (
    <div>
      <LoginNavbar />
      <div className='reg_container'>
        <h1 className='reg_container_head'>Admin Login Form...</h1>
        <form className='reg_inp_form login_inp_form'>
          <input value={userName} name='userName' onChange={handelChange} className='reg_inp' type='text' placeholder='User Name' />
          <input value={email} name='email' onChange={handelChange} className='reg_inp' type='email' placeholder='Email' />
          <input value={password} name='password' onChange={handelChange} className='reg_inp' type='password' placeholder='Password' />
          <button className='reg_inp_btn' onClick={handelClick}>Login</button>
          {/* <button className='reg_inp_btn' onClick={handelClick_1}>SignUp</button> */}
        </form>
      </div>
    </div>
  )
}

export default Login