import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import fireDB from '../../../firebase';
import "./attendanceDB.css";
import Select from 'react-select';
import { useNavigate } from 'react-router';


const AttendanceDB = () => {

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

    const options1 = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
        { value: '13', label: '13' },
        { value: '14', label: '14' },
        { value: '15', label: '15' },
        { value: '16', label: '16' },
        { value: '17', label: '17' },
        { value: '18', label: '18' },
        { value: '19', label: '19' },
        { value: '20', label: '20' },
        { value: '21', label: '21' },
        { value: '22', label: '22' },
        { value: '23', label: '23' },
        { value: '24', label: '24' },
        { value: '25', label: '25' },
        { value: '26', label: '26' },
        { value: '27', label: '27' },
        { value: '28', label: '28' },
        { value: '29', label: '29' },
        { value: '30', label: '30' },
        { value: '31', label: '31' },
    ];

    const options2 = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const options3 = [
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },

    ];

    const handelOptionSelect1 = (selectedOption) => {
        console.log("Sesion : " + selectedOption.value);
        localStorage.setItem('day', selectedOption.value)
        setDay(selectedOption.value)
        
    }
    const handelOptionSelect2 = (selectedOption) => {
        console.log("Sesion : " + selectedOption.value);
        localStorage.setItem('month', selectedOption.value)
        setMonth(selectedOption.value)
        
    }
    const handelOptionSelect3 = (selectedOption) => {
        localStorage.setItem('year', selectedOption.value)
        console.log("Sesion : " + selectedOption.value);


        fireDB.database().ref().child(`Attendance/AttendanceDB/${year}/${department}/${subject}/${day}${month}${selectedOption.value}`).on('value', (snapshot) => {
            if (snapshot.val() != null) {
                setValue4({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        })
        localStorage.setItem('ddaattee', localStorage.getItem('day')+localStorage.getItem('month')+selectedOption.value)
        navigate('/sheet')

    }

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
        e.target.style.backgroundColor = '#a3b18a';
    }

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

    const handelSubjects = (e) => {
        setSubject(e.target.value)
        localStorage.setItem('AttendanceDBSubject', e.target.value)
        
        e.target.style.backgroundColor = '#a3b18a';
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
            <div className='studentDB_department_container'>

                {Object.keys(value2).map((id, index) => {
                    return (
                        <div>
                            <button className='studentDB_department_container_btn' onClick={handelSemester} value={value2[id]}>{value2[id]}</button>
                        </div>
                    )
                })}
            </div>

            <div className='studentDB_department_container'>

                {Object.keys(value3).map((id, index) => {
                    return (
                        <div>
                            <button className='studentDB_department_container_btn' onClick={handelSubjects} value={value3[id].subjectCode}>{value3[id].subjectCode}</button>
                        </div>
                    )
                })}
            </div>
            {subject !== null ? <div className='attendanceDB_select'>
                <Select
                    onChange={handelOptionSelect1}
                    options={options1}
                    className='options_1'
                    placeholder='Date'
                />
                <Select
                    onChange={handelOptionSelect2}
                    options={options2}
                    className='options_1'
                    placeholder='Month'
                />
                <Select
                    onChange={handelOptionSelect3}
                    options={options3}
                    className='options_1'
                    placeholder='Year'
                />
            </div> : null}

            <div className='studentDB_department_container'>

                {Object.keys(value4).map((id, index) => {
                    return (
                        <div>
                            <button className='studentDB_department_container_btn' onClick={handelSubjects} value={value4[id]}>{value4[id]}</button>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default AttendanceDB