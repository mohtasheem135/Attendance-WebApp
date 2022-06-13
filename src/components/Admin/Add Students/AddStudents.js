import React, { useEffect, useState } from 'react';
import fireDB from '../../../firebase';
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import "./addStudents.css"

const AddStudents = () => {

    const [data, setData] = useState('');
    const [value, setValue] = useState('');
    const [year, setYear] = useState(null);
    const [department, setDepartment] = useState(null);

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

        fireDB.database().ref().child(`Attendance/Department`).on('value', (snapshot) => {
            if (snapshot.val() != null) {
                setValue({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        })

    }, [])

    const values = {
        name: '',
        email: '',
        roll: '',
    }

    const [initialState, setInitialState] = useState('');
    const { name, email, roll } = initialState;

    const handelChange = (e) => {
        let { name, value } = e.target;
        setInitialState({
            ...initialState,
            [name]: value,
        })
    }

    const handelClick1 = (e) => {
        localStorage.setItem('year', e.target.value)
        setYear(e.target.value)
    }

    const handelClick2 = (e) => {
        localStorage.setItem('department', e.target.value)
        setDepartment(e.target.value)
    }

    const handelSubmit = (e) => {
        e.preventDefault();

        if (year !== null && department !== null) {
            fireDB.database().ref().child(`Attendance/studentDB/${localStorage.getItem('year')}/${localStorage.getItem('department')}/${initialState.roll}`).set(initialState, (err) => {
                if (err) {
                    alert("An Error Occured ... Try Again");
                } else {
                    setInitialState({
                        name: '',
                        email: '',
                        roll: '',
                    })
                }
            })

            fireDB.database().ref().child(`Attendance/studentDB/${localStorage.getItem('year')}/${localStorage.getItem('department')}/Roll`).push(initialState.roll, (err) => {
                if (err) {
                    alert("An Error Occured ... Try Again");
                } else {
                    setInitialState({
                        name: '',
                        email: '',
                        roll: '',
                    })
                }
            })
        } else {
            alert("Select the Batch and Department.....");
            setInitialState({
                name: '',
                email: '',
                roll: '',
            })
        }




    }

    return (
        <div>
            <AdminNavbar />

            <div className='studentsbtn_container_admin_1'>

                {Object.keys(data).map((id, index) => {
                    return (
                        <button onClick={handelClick1} value={data[id]} className='studentsbtn_container_admin_1_btn' >{data[id]}</button>

                    )
                })}

            </div>
            <div className='studentsbtn_container_1_admin_1'>
                {Object.keys(value).map((id, index) => {
                    return (
                        <button onClick={handelClick2} value={value[id]} className='studentsbtn_container_admin_1_btn_2' >{value[id]}</button>

                    )
                })}
            </div>

            {year !== null && department !== null ? <p className='student_container_1_subcontainer_1_year_p1'>Batch :- {year} & Department :- {department}</p> : <p className='student_container_1_subcontainer_1_year_p2'>Select the Batch and Department</p>}

            <div className='studentsbtn_container_admin_1_inp_container'>
                <input value={name} onChange={handelChange} name='name' className='studentsbtn_container_admin_1_inp_container_inp' placeholder='Name' />
                <input value={roll} onChange={handelChange} name='roll' className='studentsbtn_container_admin_1_inp_container_inp' placeholder='Roll Number' />
                <input value={email} onChange={handelChange} name='email' className='studentsbtn_container_admin_1_inp_container_inp' placeholder='Email' />
                <button onClick={handelSubmit} className='studentsbtn_container_admin_1_inp_container_btn' >Submit</button>
            </div>
        </div>
    )
}

export default AddStudents