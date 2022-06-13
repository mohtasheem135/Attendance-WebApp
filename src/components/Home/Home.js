import React, { useEffect, useState } from 'react';
import "./home.css";
import Navbar from '../Navbar.js/Navbar';
import img_1 from "../../Resources/img_1.jpg";
import Select from 'react-select';
import { useNavigate } from 'react-router';
import Footer from '../Footer/Footer';
import fireDB from '../../firebase';

const Home = () => {

  const [data, setData] = useState('');
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [year, setYear] = useState(null);
  const [department, setDepartment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fireDB.database().ref().child(`Attendance/Year`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })
  }, [])


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

  function handleClick2(e) {
    e.preventDefault();
    navigate('/attendance');
  }


  const handelYear = (e) => {
    e.preventDefault();
    localStorage.setItem('selectYear', e.target.value);
    setYear(e.target.value)

    fireDB.database().ref().child(`Attendance/Department`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setValue({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

  }

  const handelDepartment = (e) => {
    e.preventDefault();
    localStorage.setItem('selectDepartment', e.target.value);
    setDepartment(e.target.value)

    fireDB.database().ref().child(`Attendance/Semester`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setValue2({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })
  }

  return (
    <div>
      <Navbar />

      <div className='home_container_1'>
        <div className='home_container_1_subcontainer_1'>
          <div className='home_container_1_subcontainer_1_year_cont'>
            {Object.keys(data).map((id, index) => {
              return (
                <button value={data[id]} onClick={handelYear} className='home_container_1_subcontainer_1_year_btn'>{data[id]}</button>
              )
            })}
          </div>
          <div className='home_container_1_subcontainer_1_department_cont'>
            {Object.keys(value).map((id, index) => {
              return (
                <button value={value[id]} onClick={handelDepartment} className='home_container_1_subcontainer_1_year_btn_1'>{value[id]}</button>
              )
            })}
          </div>
          <div className='home_container_1_subcontainer_1_department_cont'>
            {Object.keys(value2).map((id, index) => {
              return (
                <button value={value2[id]} onClick={handelDepartment} className='home_container_1_subcontainer_1_year_btn_1'>{value2[id]}</button>
              )
            })}
          </div>
          {year !== null && department !== null ? <p className='home_container_1_subcontainer_1_year_p1'>Batch :- {year} & Department :- {department}</p> : <p className='home_container_1_subcontainer_1_year_p2'>Select the Batch and Department</p>}
          <hr />
          <p className='home_container_1_subcontainer_1_p_1'>Select the Semester</p>
          <Select
            onChange={handelOptionSelect1}
            options={options1}
            className='options'
          />
        </div>
        <div className='home_container_1_img_subcontainer_2'>
          <img className='home_container_1_img' src={img_1} alt='img' />
        </div>
      </div>
      <div className='btn_container'>
        <button className='home_container_1_subcontainer_1_button_2' onClick={handleClick2}>Click</button>
      </div>
      <Footer />
    </div>
  )
}

export default Home