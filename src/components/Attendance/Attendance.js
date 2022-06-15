import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar.js/Navbar';
import './attendance.css';
import fireDB from "../../firebase";
import { useNavigate } from 'react-router';

const Attendance = () => {


  const navigate = useNavigate();

  const [studentDB, setStudentDB] = useState('');
  const [value, setValue] = useState('')

  
  // const [date, setDate] = useState('')

  const [semester, setSemester] = useState('');

  const [initial, setInitial] = useState(0);


  useEffect(() => {

    // setDate(localStorage.getItem('date'))

    setSemester(localStorage.getItem('semester'));

    fireDB.database().ref().child(`Attendance/studentDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/Roll`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setStudentDB({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

    fireDB.database().ref().child(`Attendance/AttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('setSubject')}/${semester}/${localStorage.getItem('date')}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setValue({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

    // console.log("kkkk"+localStorage.getItem('date'))

  }, []);

  var i = initial;

  function handlePresent() {
    Object.keys(studentDB).map((id, index) => {
      if (index === i) {
        console.log(studentDB[id])
        fireDB.database().ref().child(`Attendance/AttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('setSubject')}/${localStorage.getItem('date')}`).push(`${studentDB[id]} is Present`, (err) => {
          if (err) {
            console.log(err);
          } 
        })
      }
    })

      i = i + 1;
      setInitial(i)
  }


  function handleAbsent() {
    Object.keys(studentDB).map((id, index) => {
      if (index === i) {
        console.log(studentDB[id])
        fireDB.database().ref().child(`Attendance/AttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('setSubject')}/${localStorage.getItem('date')}`).push(`${studentDB[id]} is Absent`, (err) => {
          if (err) {
            console.log(err);
          } 
        })
      }
    })

      i = i + 1;
      setInitial(i)
  }



 


  return (
    <div>
      <Navbar />

      <div className='attendance_db_container_1'>
        {Object.keys(value).map((id, index) => {
          return (
            <div>

              <p className='attendance_db_container_1_p1'>{value[id]}</p>
            </div>
          )
        })}

      </div>
      <div className='attendance_db_container_2'>
      <h1 className='attendance_container_1_head' >{semester}</h1>
      <p className='attendance_container_1_p_1'>Subject :- {localStorage.getItem('setSubject')} students</p>
        {Object.keys(studentDB).map((id, index) => {
          return (
            <div>
              {index === i ? <h3 className='attendance_db_container_2_h3'>Current Roll Call :- {studentDB[id]}</h3> : null}
            </div>
          )
        })}

      </div>
      
        <div className='attendance_container_1_subcontainer_1'>
          <button className='btn attendance_container_1_subcontainer_1_btn_1' onClick={handlePresent}>Present</button>
          <button className='btn attendance_container_1_subcontainer_1_btn_2' onClick={handleAbsent}>Absent</button>
          {/* <button className='btn attendance_container_1_subcontainer_1_btn' onClick={handleUpload}>Upload</button> */}
        </div>

      {/* <Footer/> */}
    </div>
  )
}

export default Attendance