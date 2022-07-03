import React, { useEffect, useState } from 'react';
import fireDB from '../../../firebase';
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import "./addSubject.css"

const AddSubject = () => {

    const [data, setData] = useState('');
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    // const [subject, setSubject] = useState('');
    const [year, setYear] = useState(null);
    const [department, setDepartment] = useState(null);
    const [semester, setSemester] = useState(null);

    const values = {
        subjectCode: '',
        classes: 0,
    }
    const [initialState, setInitialState] = useState({
        classes: 0
    });
    const { subjectCode, classes } = initialState;

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

    const handelSemester = (e) => {
        e.target.style.backgroundColor = '#a3b18a';
        localStorage.setItem('selectSemester', e.target.value);
        setSemester(e.target.value)

        fireDB.database().ref().child(`Attendance/Subjects/${year}/${department}/${e.target.value}`).on('value', (snapshot) => {
            if (snapshot.val() != null) {
                setValue3({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        })

    }



    const handelChange = (e) => {
        // setSubject(e.target.value);
        let { name, value } = e.target;
        setInitialState({
            ...initialState,
            [name]: value,
        })
    }

    const handelInput = () => {
        fireDB.database().ref().child(`Attendance/Subjects/${year}/${department}/${semester}/${initialState.subjectCode}`).set(initialState, (err) => {
            if (err) {
                console.log(err);
            } else {
                alert("Uploaded!!!!")
            }
        })
    }


    return (
        <div>
            <AdminNavbar />
            {/* Year */}
            <div className='home_container_1_subcontainer_1_year_cont'>
                {Object.keys(data).map((id, index) => {
                    return (
                        <button value={data[id]} onClick={handelYear} className='home_container_1_subcontainer_1_year_btn'>{data[id]}</button>
                    )
                })}
            </div>

            {/* Department */}
            <div className='home_container_1_subcontainer_1_department_cont'>
                {Object.keys(value).map((id, index) => {
                    return (
                        <button value={value[id]} onClick={handelDepartment} className='home_container_1_subcontainer_1_year_btn_1'>{value[id]}</button>
                    )
                })}
            </div>
            
            {/* Semester */}
            <div className='home_container_1_subcontainer_1_department_cont addSubject_semester_container'>
                {Object.keys(value2).map((id, index) => {
                    return (
                        <button value={value2[id]} onClick={handelSemester} className='home_container_1_subcontainer_1_year_btn_1 addSubject_semester_container_btn'>{value2[id]}</button>
                    )
                })}
            </div>
            {semester !== null ?
                <div className='addSubject_inp_container'>
                    <input name='subjectCode' type='text' value={subjectCode} className='addSubject_inp_container_inp' onChange={handelChange} placeholder='Enter the Subject Code' />
                    <button onClick={handelInput} className='addSubject_inp_container_btn' >Submit</button>
                </div>
                : <h1 className='addSubject_inp_container_head'>Firstly select the Year, Department & Semester  </h1>
            }

            {semester !== null ?
                <div className='addSubject_subjectCode'>
                    <p className='addSubject_subjectCode_p1'>Subjects In this Semester</p>
                    {Object.keys(value3).map((id, index)=> {
                        return(
                            <button className='addSubject_subjectCode_btn'>{value3[id].subjectCode}</button>
                        )
                    })}
                    <p className='addSubject_subjectCode_p2'><b>Note :-</b> Do Not add the same subject again</p>
                </div>
                : null
            }
        </div>
    )
}

export default AddSubject