import React, { useEffect, useState } from 'react';
import "./AttendancePage.css";
import img_1 from "../../../Resources/img_1.jpg"
import Select from 'react-select';
import { useNavigate } from 'react-router';
import Navbar from '../../Navbar.js/Navbar';
import fireDB from '../../../firebase';
import Footer from '../../Footer/Footer';
import AdminNavbar from '../../Navbar.js/AdminNavbar';

const AttendancePage = () => {

  const [data, setData] = useState('');
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('')
  const [subjectCode, setSubjectCode] = useState(null)

  const [year, setYear] = useState(null);
  const [department, setDepartment] = useState(null);

  // const [date, setDate] = useState('');
  // const [month, setMonth] = useState('');
  // const [year2, setYear2] = useState('');
  const [finalDate, setFinalDate] = useState('')

  
    // setDate(`${current.getDate()}`)
    // setMonth(`${current.getMonth() + 1}`)
    // setYear2(`${current.getFullYear()}`)
    

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
    
    const current = new Date();
    setFinalDate(`${current.getDate()}${current.getMonth() + 1}${current.getFullYear()}`)
    
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
    localStorage.setItem('SelectSemester', selectedOption.value);
    setSemester(selectedOption.value)
    fireDB.database().ref().child(`Attendance/Subjects/${year}/${department}/${selectedOption.value}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setSubject({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })
  }
  
  function handleClick2(e) {
    e.preventDefault();
    localStorage.setItem('date', finalDate);
    console.log(finalDate)
    navigate('/attendance');
  }
  
  
  const handelYear = (e) => {
    console.log(finalDate)
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
    e.target.style.backgroundColor = '#a3b18a';
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
    e.target.style.backgroundColor = '#a3b18a';
  }

  const handelSubject=(e)=> {
    localStorage.setItem('setSubject', e.target.value);
    setSubjectCode(e.target.value)
    e.target.style.backgroundColor = '#a3b18a';

    
    localStorage.setItem('date', finalDate);
    console.log("MMMM"+finalDate)
  }

  return (
    <div>
      <AdminNavbar />

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
          
          {year !== null && department !== null ? <p className='home_container_1_subcontainer_1_year_p1'>Batch :- {year} & Department :- {department}</p> : <p className='home_container_1_subcontainer_1_year_p2'>Select the Batch and Department</p>}
          {/* <hr /> */}
          {/* <p className='home_container_1_subcontainer_1_p_1'>Select the Semester</p> */}
          <Select
            onChange={handelOptionSelect1}
            options={options1}
            className='options'
          />
          <div className='home_container_1_subcontainer_1_subject_cont'>
            {Object.keys(subject).map((id, index) => {
              return (
                <button value={subject[id].subjectCode} onClick={handelSubject} className='home_container_1_subcontainer_1_year_btn_1'>{subject[id].subjectCode}</button>
              )
            })}
          </div>
          {subjectCode!==null?<button className='home_container_1_subcontainer_1_button_2' onClick={handleClick2}>Click</button>: <h3 className='home_container_1_subcontainer_1_head3'>Select the Department, Semester and Subject</h3>}
        </div>
        <div className='home_container_1_img_subcontainer_2'>
          <img className='home_container_1_img' src={img_1} alt='img' />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AttendancePage