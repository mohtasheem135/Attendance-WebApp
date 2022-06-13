import React, { useEffect, useState } from 'react';
import "./studentDB.css";
import AdminNavbar from "../../Navbar.js/AdminNavbar";
import fireDB from "../../../firebase";

const StudentDB = () => {

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
        localStorage.setItem('studentDBYear', e.target.value)

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
            {year!==null&&department!==null ? <p className='studentDB_list_p1'> Currently Selected Batch {year} & Department {department}</p> : <p className='studentDB_list_p2'>Select the Batch and Department</p>}


            {year!==null&&department!==null ? <table className='studentDB_table'>
                <th className='studentDB_table_th'>Name</th>
                <th className='studentDB_table_th'>Roll Number</th>
                <th className='studentDB_table_th'>Email</th>

                {Object.keys(studentDB).map((id, index) => {
                    return (
                        <tr className='studentDB_table_tr'>
                            <td className='studentDB_table_td'>{studentDB[id].name}</td>
                            <td className='studentDB_table_td'>{studentDB[id].roll}</td>
                            <td className='studentDB_table_td'>{studentDB[id].email}</td>
                        </tr>
                    )
                })}
            </table> : null}
            
            
        </div>
    )
}

export default StudentDB