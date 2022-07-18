import React, { useEffect, useState } from 'react';
import "./studentAttendance.css"
import fireDB from '../../../firebase';
import AdminNavbar from '../../Navbar.js/AdminNavbar';

const StudentAttendanceDB = () => {

  const [data, setData] = useState('');
  const [dates, setDates] = useState('');
  const [initial, setInitial] = useState(0);
  const [present, setPresent] = useState(0)
  const [absent, setAbsent] = useState(0)
  const [initial2, setInitial2] = useState(0);
  const [attendance, setAttendance] = useState('')
  const [attendancePercentage, setAttendancePercentage] = useState('')
  const [roll, setRoll] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fireDB.database().ref().child(`Attendance/StudentDB/${localStorage.getItem('attendanceDBYear')}/${localStorage.getItem('AttendanceDBDepartment')}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

    fireDB.database().ref().child(`Attendance/ClassDates/${localStorage.getItem('attendanceDBYear')}/${localStorage.getItem('AttendanceDBDepartment')}/${localStorage.getItem('AttendanceDBSemester')}/${localStorage.getItem('AttendanceDBSubject')}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setDates({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

  }, [])

  // useEffect(() => {
  //   run();
  // })

  var i = 0;
  var p = 0;
  var a = 0;
  var j = 0;

  const handleClick = (e) => {
    // console.log(e.target.value)
    setRoll(e.target.value)
    // setLoading(false)
    var i = 0;
    var p = 0;
    var a = 0;
    Object.keys(dates).map((id, index) => {
      if (index === i) {
        console.log(i + "  is  " + dates[id])
        fireDB.database().ref().child(`Attendance/StudentAttendanceProfile/${localStorage.getItem('attendanceDBYear')}/${localStorage.getItem('AttendanceDBDepartment')}/${localStorage.getItem('AttendanceDBSemester')}/${localStorage.getItem('AttendanceDBSubject')}/${dates[id]}/${e.target.value}`).on('value', (snapshot) => {
          if (snapshot.val() != null) {
            setAttendance(snapshot.val())
            if (snapshot.val() == 1) {
              p = p + 1;
              setPresent(p);
            } else {
              a = a + 1;
              setAbsent(a);
            }
          } else {
            snapshot({});
          }
        })
        i = i + 1;
        setInitial(i)
      }

    })
    // var percent = 100 / ((present + absent) / present);
    // setAttendancePercentage(percent)
  }

  return (
    <div>
      <AdminNavbar />
      {/* 
        <p>{localStorage.getItem('attendanceDBYear')}</p>
        <p>{localStorage.getItem('AttendanceDBDepartment')}</p>
        <p>{localStorage.getItem('AttendanceDBSemester')}</p>
        <p>{localStorage.getItem('AttendanceDBSubject')}</p> */}

      <div className='attendanceDB-container_1'>
        {Object.keys(data).map((id, index) => {
          return (
            <div className='attendance-name-container'>
              <button onClick={handleClick} value={data[id].FIELD3} className='attendance-name-btn'>{data[id].FIELD2} - {data[id].FIELD3}</button>
            </div>
          )
        })}
      </div>

      <div className='attendance-details-container'>
        <p className='home-attendanceprofile-container-1-p2'>Roll Number :- <b>{roll}</b></p>
        <p className='home-attendanceprofile-container-1-p2'>Total Number of Classes = {present + absent}</p>
        <div className='home-attendanceprofile-container-1-h1-container'>
          <h2 className='home-attendanceprofile-container-1-h1-1'>Present : {present} Classes</h2>
          <h2 className='home-attendanceprofile-container-1-h1-2'>Absent : {absent} Classes</h2>

        </div>
        <h1 className='home-attendanceprofile-container-1-h1-3'>Attendance Percentage :- {100 / ((present + absent) / present)}%</h1>
        {100 / ((present + absent) / present)>=75 ? <p className='result-attendance-1'></p> : <p className='result-attendance-2'></p>}

      </div>
    </div>
  )
}

export default StudentAttendanceDB