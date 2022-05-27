import React, { useEffect, useState } from 'react';
import "./home.css";
import Navbar from '../Navbar.js/Navbar';
import img_1 from "../../Resources/img_1.jpg";
import Select from 'react-select';
import { useNavigate } from 'react-router';
import Footer from '../Footer/Footer';

const Home = () => {

  const [inputValue, setInputValue] = useState('');
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();


  const options1 = [
    { value: '1st Semester', label: '1st Semester' },
    { value: '2nd Semester', label: '2nd Semester' },
    { value: '3rd Semester', label: '3rd Semester' },
    { value: '4th Semester', label: '4th Semester' },
    { value: '5th Semester', label: '5th Semester' },
    { value: '6th Semester', label: '6th Semester' },
    { value: '7th Semester', label: '7th Semester' },
    { value: '8th Semester', label: '8th Semester' },
  ];

  const handelOptionSelect1 = (selectedOption) => {
    console.log("Sesion : " + selectedOption.value);
    localStorage.setItem('semester', selectedOption.value);
  }

  function handleChange(e) {
    // console.log(e.target.value)
    setInputValue(e.target.value);
    localStorage.setItem('strength', e.target.value);
    setDisable(false)
  }

  // function handleClick1(e) {
  //   e.preventDefault();
  //   console.log(inputValue)
  // }

  function handleClick2(e) {
    e.preventDefault();
    // localStorage.setItem('semester', inputValue);

    navigate('/attendance');
  }

  function handleDB() {
    navigate('/registerdb')
  }

  

  return (
    <div>
      <Navbar />

      <div className='home_container_1'>
        <div className='home_container_1_subcontainer_1'>
          <p className='home_container_1_subcontainer_1_p_1'>Select the Semester</p>
          <Select
            onChange={handelOptionSelect1}
            options={options1}
            className='options'
          />
          <br />
          <br />
          <hr />
          <input className='home_container_1_subcontainer_1_input' onChange={handleChange} placeholder="Enetr the strength of class" />
          {/* <button className='home_container_1_subcontainer_1_button_1' onClick={handleClick2}>Click</button> */}
        </div>
        <div className='home_container_1_img_subcontainer_2'>
          <img className='home_container_1_img' src={img_1} alt='img' />
        </div>
      </div>
      <div className='btn_container'>
        <button disabled={disable} className='home_container_1_subcontainer_1_button_2' onClick={handleClick2}>Click</button>
        <button className='home_container_1_subcontainer_1_button_3' onClick={handleDB}>Attendance DB</button>
      </div>
      <Footer />
    </div>
  )
}

export default Home