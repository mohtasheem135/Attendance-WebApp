import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import { useNavigate } from 'react-router';
import fireDB from '../../../firebase';

const StudentAttendance = () => {
    const navigate = useNavigate();

    const [data, setData] = useState('');
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [subject, setSubject] = useState(null)
    const [year, setYear] = useState(null);
    const [department, setDepartment] = useState(null);
    const [semester, setSemester] = useState('');
    const [studentDB, setStudentDB] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')

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

    // Year
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
        e.target.style.backgroundColor = '#a3b18a';
    }

    // Department
    const handelDepartment = (e) => {
        e.preventDefault();
        setDepartment(e.target.value);
        localStorage.setItem('AttendanceDBDepartment', e.target.value)

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

    // Semester
    const handelSemester = (e) => {
        setSemester(e.target.value)
        localStorage.setItem('AttendanceDBSemester', e.target.value);
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

    // Subjects
    const handelSubjects = (e) => {
        setSubject(e.target.value)
        localStorage.setItem('AttendanceDBSubject', e.target.value)
        navigate('/studentattendancedb')
        e.target.style.backgroundColor = '#a3b18a';
    }

    return (
        <div>
            <AdminNavbar />

            <div className='studentDB_year_container'>
                {/* Year */}
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
            <div className='studentDB_department_container'>

                {Object.keys(value2).map((id, index) => {
                    return (
                        <div>
                            <button className='studentDB_department_container_btn' onClick={handelSemester} value={value2[id]}>{value2[id]}</button>
                        </div>
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
        </div>
    )
}

export default StudentAttendance