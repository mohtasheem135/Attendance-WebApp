import React, { useState } from 'react';
import fireDB from '../../../firebase';
import LoginNavbar from '../../Navbar.js/LoginNavbar';
import "./loginSignup.css";
import { useNavigate } from 'react-router';

const SignUp = () => {

  const navigate = useNavigate();

  const values = {
    name: '',
    userName: '',
    email: '',
    mobile: '',
    password: '',
    cpassword: '',

  }

  const [initialState, setInitialState] = useState({});
  const { name, userName, email, mobile, password, cpassword } = initialState;

  const handelChange = (e) => {
    let { name, value } = e.target;
    setInitialState({
      ...initialState,
      [name]: value,
    })
  }

  const handelClick = (e) => {
    e.preventDefault()
    if (initialState.password === initialState.cpassword) {
      fireDB.database().ref().child(`Attendance/Admin/${initialState.userName}`).set(initialState, (err) => {
        if (err) {
          console.log(err);
        }
        else {
          alert('Admin Added Successfully 👍👍👍');
          navigate('/login');
        }
      })
    } else {
      alert("Password didn't matched.....try again!!!!!!!!");
      setInitialState({
        name: '',
        userName: '',
        email: '',
        mobile: '',
        password: '',
        cpassword: '',
      })
    }
  }

  return (
    <div>
      <LoginNavbar />
      <div className='reg_container'>
        <h1 className='reg_container_head'>Admin Registration Form...</h1>
        <form className='reg_inp_form'>
          <input value={name} name='name' onChange={handelChange} className='reg_inp' type='text' placeholder='Name' />
          <input value={userName} name='userName' onChange={handelChange} className='reg_inp' type='text' placeholder='User Name' />
          <input value={email} name='email' onChange={handelChange} className='reg_inp' type='email' placeholder='Email' />
          <input value={mobile} name='mobile' onChange={handelChange} className='reg_inp' type='number' placeholder='Mobile Number' />
          <input value={password} name='password' onChange={handelChange} className='reg_inp' type='password' placeholder='Password' />
          <input value={cpassword} name='cpassword' onChange={handelChange} className='reg_inp' type='password' placeholder='Confirm Password' />
          <button className='reg_inp_btn' onClick={handelClick}>Register</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp