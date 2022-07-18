import React, { useEffect, useState } from 'react';
import "./home.css";
import { useNavigate } from 'react-router';
import fireDB from '../../firebase';
import Navbar from '../Navbar.js/Navbar';
import Footer from "../Footer/Footer";
import img_1 from "../../Resources/img_5.jpg"

const Home = () => {


  const navigate = useNavigate();

  const [data, setData] = useState('');
  const [year, setYear] = useState(null);
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [department, setDepartment] = useState(null);
  const [semester, setSemester] = useState(null);
  const [subject, setSubject] = useState(null);
  const [studentDB, setStudentDB] = useState('');
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);

  const [roll, setRoll] = useState('')

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

  const handelYear = (e) => {
    e.preventDefault();
    setYear(e.target.value);
    localStorage.setItem('profileYear', e.target.value)

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
    setDepartment(e.target.value);
    localStorage.setItem('profileDepartment', e.target.value)

    // if (localStorage.getItem('studentDBYear') !== null && e.target.value !== null) {
    if (year !== null && e.target.value !== null) {
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
    e.target.style.backgroundColor = '#a3b18a';
  }

  const handelSemester = (e) => {
    setSemester(e.target.value)
    localStorage.setItem('profileSemester', e.target.value)
    fireDB.database().ref().child(`Attendance/Subjects/${year}/${department}/${e.target.value}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setValue3({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })
    e.target.style.backgroundColor = '#a3b18a';
  }

  const handelSubjects = (e) => {
    setSubject(e.target.value)
    localStorage.setItem('profileSubjects', e.target.value)

    // Number of Classes

    fireDB.database().ref().child(`Attendance/Subjects/${year}/${department}/${semester}/${e.target.value}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setValue4({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

    // StudentDB
    fireDB.database().ref().child(`Attendance/studentDB/${localStorage.getItem('studentDBYear')}/${localStorage.getItem('studentDBDepartment')}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setStudentDB({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

    fireDB.database().ref().child(`Attendance/StudentAttendanceDB/${year}/${department}/${semester}/${e.target.value}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setValue5({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

    let p = 0;
    let a = 0;

    Object.keys(value5).map((id, index) => {
      fireDB.database().ref().child(`Attendance/StudentAttendanceDB/${year}/${department}/${semester}/${e.target.value}/${studentDB[id].roll}`).on('value', (snapshot) => {
        if (snapshot.val() != null) {
          setValue6({
            ...snapshot.val(),
          });
        } else {
          snapshot({});
        }
      })
      console.log(value6)
      // }
    })
    e.target.style.backgroundColor = '#a3b18a';
  }


  const handelChangeinp = (e) => {
    // setRoll(e.target.value)
    localStorage.setItem('profileRoll', e.target.value)
  }

  const handelChangebtn = () => {
    navigate('/attendanceprofile')
  }


  return (
    <div>
      <Navbar />
      {/* Year */}
      <div className='studentDB_year_container'>
        {Object.keys(data).map((id, index) => {
          return (
            <div>
              <button className='studentDB_year_container_btn' onClick={handelYear} value={data[id]}>{data[id]}</button>
            </div>
          )
        })}
      </div>

      {/* Department */}
      <div className='studentDB_department_container'>
        {Object.keys(value).map((id, index) => {
          return (
            <div>
              <button className='studentDB_department_container_btn' onClick={handelDepartment} value={value[id]}>{value[id]}</button>
            </div>
          )
        })}
      </div>

      {/* Semester */}
      <div className='Home_department_container'>
        {Object.keys(value2).map((id, index) => {
          return (
            <button className='Home_department_container_btn' onClick={handelSemester} value={value2[id]}>{value2[id]}</button>

          )
        })}
      </div>
      
      {/* Subjects */}
      <div className='studentDB_department_container'>
        {Object.keys(value3).map((id, index) => {
          return (
            <div>
              <button className='studentDB_department_container_btn' onClick={handelSubjects} value={value3[id].subjectCode}>{value3[id].subjectCode}</button>
            </div>
          )
        })}
      </div>
      {subject !== null ? <div className='attendance-profile-inp-container'>
        <input className='attendance-profile-inp' onChange={handelChangeinp} placeholder='Roll - Number' />
        <button className='attendance-profile-inp-btn' onClick={handelChangebtn}>Check</button>
      </div> : null}
      <img className='Home_img-1' src={img_1} />
<Footer />
    </div>
  )
}

export default Home