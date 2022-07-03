import React, { useEffect, useState } from 'react';
import fireDB from '../../../firebase';
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import "./attendanceSheet.css"

const AttendanceSheet = () => {

  const [attendanceDB, setAttendanceDB] = useState('');


  useEffect(() => {

    console.log(localStorage.getItem('attendanceDBYear'))
    console.log(localStorage.getItem('AttendanceDBDepartment'))
    console.log(localStorage.getItem('AttendanceDBSemester'))
    console.log(localStorage.getItem('AttendanceDBSubject'))
    // console.log(localStorage.getItem('day'))
    // console.log(localStorage.getItem('month'))
    // console.log(localStorage.getItem('year'))
    console.log(localStorage.getItem('ddaattee'))




    fireDB.database().ref(`Attendance/AttendanceDB/${localStorage.getItem('attendanceDBYear')}/${localStorage.getItem('AttendanceDBDepartment')}/${localStorage.getItem('AttendanceDBSemester')}/${localStorage.getItem('AttendanceDBSubject')}/${localStorage.getItem('ddaattee')}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setAttendanceDB({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

    console.log(attendanceDB)
  }, [])

  const handelPrint=() => {
    window.print()
  }
  return (


    <div>
      <AdminNavbar />
      <div className='attendanceSheet_container_container_0'>
        <div className='attendanceSheet_container_container_0_data'>
          <p className='attendanceSheet_container_container_0_data_p'><b>Batch :</b> {localStorage.getItem('attendanceDBYear')}</p>
          <p className='attendanceSheet_container_container_0_data_p'><b>Department :</b> {localStorage.getItem('AttendanceDBDepartment')}</p>
          <p className='attendanceSheet_container_container_0_data_p'><b>Semester :</b> {localStorage.getItem('AttendanceDBSemester')}</p>
          <p className='attendanceSheet_container_container_0_data_p'><b>Subject :</b> {localStorage.getItem('AttendanceDBSubject')}</p>
        </div>
        <div className='attendanceSheet_container_container_0_print'>
          <button onClick={handelPrint} className='attendanceSheet_container_container_0_print_btn'>Print</button>
        </div>
      </div>
      <div className='attendanceSheet_container_1'>
        <div className='attendanceSheet_container_2'>
          {Object.keys(attendanceDB).slice(0, 15).map((id, index) => {
            return (
              <p className="atendanceDB_container_2_p">{attendanceDB[id]}</p>
            )
          })}
        </div>
        <div className='attendanceSheet_container_2'>
          {Object.keys(attendanceDB).slice(15, 30).map((id, index) => {
            return (
              <p className="atendanceDB_container_2_p">{attendanceDB[id]}</p>
            )
          })}
        </div>
        <div className='attendanceSheet_container_2'>
          {Object.keys(attendanceDB).slice(30, 45).map((id, index) => {
            return (
              <p className="atendanceDB_container_2_p">{attendanceDB[id]}</p>
            )
          })}
        </div>
        <div className='attendanceSheet_container_2'>
          {Object.keys(attendanceDB).slice(45, 60).map((id, index) => {
            return (
              <p className="atendanceDB_container_2_p">{attendanceDB[id]}</p>
            )
          })}
        </div>
        <div className='attendanceSheet_container_2'>
          {Object.keys(attendanceDB).slice(60, 75).map((id, index) => {
            return (
              <p className="atendanceDB_container_2_p">{attendanceDB[id]}</p>
            )
          })}
        </div>
        {/* <div className='attendanceSheet_container_2'>
          {Object.keys(attendanceDB).slice(50, 60).map((id, index) => {
            return (
              <p className="atendanceDB_container_2_p">{attendanceDB[id]}</p>
            )
          })}
        </div> */}
      </div>
    </div>
  )
}

export default AttendanceSheet