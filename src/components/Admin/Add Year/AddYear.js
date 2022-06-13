import React, { useState } from 'react';
import "./addyear.css";
import AdminNavbar from "../../Navbar.js/AdminNavbar"
import fireDB from "../../../firebase"

const AddYear = () => {

    const [year, setYear] = useState('')

    const handelClick = (e) => {
        e.preventDefault();

        fireDB.database().ref().child(`Attendance/Year`).push(year, (err) => {
            if (err) {
                console.log(err);
            } else {
                alert('Year Added Successfully');
                setYear('')
            }
        })
    }

    const handelChange = (e) => {
        setYear(e.target.value);
    }

    return (
        <div>
            <AdminNavbar />
            <h1 className='addYear_head'>Add A new Term</h1>
            <div className='addYear_inp_container'>
                <input value={year} onChange={handelChange} className='addYear_inp' placeholder='2022 - 2026' />
                <button onClick={handelClick} className='addYear_inp_btn'>Submit</button>
            </div>
        </div>
    )
}

export default AddYear