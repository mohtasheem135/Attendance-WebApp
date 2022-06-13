import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import fireDB from '../../../firebase';
import "./attendanceDB.css";

const AttendanceDB = () => {

    const [data, setData] = useState('');
    const [value, setValue] = useState('');
    const [year, setYear] = useState(null);
    const [department, setDepartment] = useState(null);
    const [studentDB, setStudentDB] = useState('')

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
        localStorage.setItem('attendanceDBYear', e.target.value)

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
        setDepartment(e.target.value);
        localStorage.setItem('studentDBDepartment', e.target.value)

        // if (localStorage.getItem('studentDBYear') !== null && e.target.value !== null) {
        if (year !== null && e.target.value !== null) {
            fireDB.database().ref().child(`Attendance/studentDB/${localStorage.getItem('studentDBYear')}/${localStorage.getItem('studentDBDepartment')}`).on('value', (snapshot) => {
                if (snapshot.val() != null) {
                    setStudentDB({
                        ...snapshot.val(),
                    });
                } else {
                    snapshot({});
                }
            })
        }
    }

  return (
    <div>
        <AdminNavbar />
        <div className='studentDB_year_container'>

                {Object.keys(data).map((id, index) => {
                    return (
                        <div>
                            <button className='studentDB_year_container_btn' onClick={handelYear} value={data[id]}>{data[id]}</button>
                        </div>
                    )
                })}
            </div>
            <div className='studentDB_department_container'>

                {Object.keys(value).map((id, index) => {
                    return (
                        <div>
                            <button className='studentDB_department_container_btn' onClick={handelDepartment} value={value[id]}>{value[id]}</button>
                        </div>
                    )
                })}
            </div>
    </div>
  )
}

export default AttendanceDB