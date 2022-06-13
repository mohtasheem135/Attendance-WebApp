import React, { useEffect, useState } from 'react';
import fireDB from '../../../firebase';
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import "./addSubject.css"

const AddSubject = () => {

    const [data, setData] = useState('');
    const [value, setValue] = useState('');
    const [year, setYear] = useState(null);

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
    
      }


  return (
    <div>
        <AdminNavbar />
        <div className='home_container_1_subcontainer_1_year_cont'>
            {Object.keys(data).map((id, index) => {
              return (
                <button value={data[id]} onClick={handelYear} className='home_container_1_subcontainer_1_year_btn'>{data[id]}</button>
              )
            })}
          </div>
    </div>
  )
}

export default AddSubject