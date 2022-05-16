import { render } from '@testing-library/react';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar.js/Navbar';
import './attendance.css';
import fireDB from "../../firebase";
import { useNavigate } from 'react-router';
import Footer from '../Footer/Footer';

const Attendance = () => {


  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [semester, setSemester] = useState('');
  const [strength, setStrength] = useState('');

  const [roll, setRoll] = useState()

  useEffect(() => {
    const current = new Date();
    setDate(`${current.getDate()}`)

    setMonth(`${current.getMonth() + 1}`)
    setYear(`${current.getFullYear()}`)
    setSemester(localStorage.getItem('semester'));
    setStrength(localStorage.getItem('strength'));
  }, []);

  var i = 0;

  const data = {};
  const attendance = {}




  function handlePresent() {
    i++;
    // setRoll(i);
    if (i <= strength) {
      data[i] = `${i} is Present `;
      attendance[i] = `${i} is Present `;
      render(
        <h3 id='anchor-name' className='present_color'>{data[i]}</h3>

      )
    }
    else if (i == strength) {
      alert('Attendance Done')

    }
  }

  //   const element = document.getElementById('anchor-name')
  // element.scrollIntoView({ behavior: 'smooth', block: 'start' });


  function handleAbsent() {
    i++;
    // setRoll(i)
    if (i <= strength) {
      console.log(strength)
      data[i] = `${i} is Absent `;
      render(
        <h3 className='absent_color'>{data[i]}</h3>
      )
    }
    else if (i == strength) {
      alert('Attendance Done')
    }
  }

  function handleUpload() {
    fireDB.database().ref().child(`Attendance WebApp`).child(`${semester}/${date}${month}${year}`).set(attendance, (err) => {
      if (err) {
        console.log(err);
      } else {
        alert('Uploaded Successfully...')
        localStorage.setItem('strength', 0);
        localStorage.setItem('semester', '');
        navigate('/');
      }
    })
  }

  function handleReload() {
    i = 0;
    window.location.reload()
  }

  return (
    <div>
      <Navbar />
      <button onClick={handleReload} className='reload_btn'>Reload</button>
      <div className='attendance_container_1'>
        <h1 className='attendance_container_1_head' >{semester}</h1> <p className='attendance_container_1_p_1'>of Strength :-</p>
        <p className='attendance_container_1_p_2'>{strength} students</p>
        <div className='attendance_container_1_subcontainer_1'>
          <button className='attendance_container_1_subcontainer_1_btn_1' onClick={handlePresent}>Present</button>
          <button className='attendance_container_1_subcontainer_1_btn_2' onClick={handleAbsent}>Absent</button>
          <button className='attendance_container_1_subcontainer_1_btn_3' onClick={handleUpload}>Upload</button>
        </div>

      </div>

{/* <Footer/> */}
    </div>
  )
}

export default Attendance