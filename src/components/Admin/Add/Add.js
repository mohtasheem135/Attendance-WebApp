import React from 'react';
import "./Add.css"
import { useNavigate } from 'react-router';
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import img_1 from "../../../Resources/img_3.jpg"

const Add = () => {

    const navigate = useNavigate();

    const handelClick0 = (e) => {
        navigate('/register')
    }

    const handelClick1 = (e) => {
        navigate('/addstudent')
    }

    const handelClick2 = (e) => {
        navigate('/addyear')
    }

    const handelClick3 = (e) => {
        navigate('/addsubject')
    }

    return (
        <div>
            <AdminNavbar />
            <div className='admin_home_btn_container-add'>

                <button onClick={handelClick0} className='admin_home_btn_container_add_btn_1'>Add Admin</button>
                <button onClick={handelClick1} className='admin_home_btn_container_add_btn_1'>Add Students</button>
                <button onClick={handelClick2} className='admin_home_btn_container_add_btn_1'>Add Year</button>
                <button onClick={handelClick3} className='admin_home_btn_container_add_btn_1'>Add Subject</button>
            </div>
            <img className='adminhome-img-1' src={img_1} />
        </div>
    )
}

export default Add