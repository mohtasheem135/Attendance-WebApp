import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar.js/Navbar';
import './attendance.css';
import fireDB from "../../firebase";
import { useNavigate } from 'react-router';
import AdminNavbar from '../Navbar.js/AdminNavbar';

const Attendance = () => {


  const navigate = useNavigate();

  const [studentDB, setStudentDB] = useState('');
  const [value, setValue] = useState('')
  const [semester, setSemester] = useState('');
  const [initial, setInitial] = useState(0);
  const [subject, setSubject] = useState('');
  const [classes, setClasses] = useState(0);

  const [present, setPresent] = useState(1);
  const [present1, setPresent1] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [absent1, setAbsent1] = useState(0);

  const [classDate, setClassDate] = useState('');
  const [initial2, setInitial2] = useState(0);
  const [finalDate, setFinalDate] = useState(0);






  useEffect(() => {

    setSemester(localStorage.getItem('semester'));
    setFinalDate(localStorage.getItem('date'))

    let q1 = present1;
    let q2 = absent1;

    // Getting the Years/BAtches 

    fireDB.database().ref().child(`Attendance/StudentDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setStudentDB({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

    // Getting the Number of Classes of this Subject

    let p = subject.classes + 1;

    fireDB.database().ref().child(`Attendance/Subjects/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setSubject({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })



    setClasses(p);


    // Getting the real time attendance List - AttendanceDB

    fireDB.database().ref().child(`Attendance/AttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}/${semester}/${localStorage.getItem('date')}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setValue({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })

    // Classes Date

    fireDB.database().ref().child(`Attendance/ClassDates/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}`).on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setClassDate({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    })



  }, []);

  useEffect(() => {

    
    Object.keys(classDate).map((id, index) => {
      if (classDate[id] === localStorage.getItem('date')) {
        setInitial2(1);
        // alert('available')
        // console.log('available')

      }
      console.log("MMMMMM :- "+classDate[id])
      alert("MMMMMM :- "+classDate[id])
    })
  }, [])

  var i = initial;

  function handlePresent() {
    Object.keys(studentDB).map((id, index) => {
      if (index === i) {
        console.log(studentDB[id])
        fireDB.database().ref().child(`Attendance/AttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}/${localStorage.getItem('date')}`).push(`${studentDB[id].FIELD3} is Present`, (err) => {
          if (err) {
            console.log(err);
          }
        })


        // fireDB.database().ref().child(`Attendance/StudentAttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('setSubject')}/${localStorage.getItem('date')}/${studentDB[id].roll}`).push(`${present}`, (err) => {
        fireDB.database().ref().child(`Attendance/StudentAttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}/${studentDB[id].FIELD3}`).push(`${present}`, (err) => {
          if (err) {
            console.log(err);
          }
        })

        // Student Attendance Profile

        fireDB.database().ref().child(`Attendance/StudentAttendanceProfile/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}/${localStorage.getItem('date')}/${studentDB[id].FIELD3}`).set(`${present}`, (err) => {
          if (err) {
            console.log(err);
          }
        })
      }
    })

    i = i + 1;
    setInitial(i)
    Object.keys(classDate).map((id, index) => {
      if (classDate[id] === localStorage.getItem('date')) {
        setInitial2(1);
        // alert('available')
        // console.log('available')

      }
      console.log("MMMMMM :- "+classDate[id])
      // alert("MMMMMM :- "+classDate[id])
    })
   

    // Object.keys(classDate).map((id, index) => {
    //   // if (classDate[id] === localStorage.getItem('date')) {
    //   //   setInitial2(1);
    //   //   alert('available')
    //   // }

    //   console.log("MMMMMM :- "+classDate[id])
    // })
  }


  function handleAbsent() {
    Object.keys(studentDB).map((id, index) => {
      if (index === i) {
        console.log(studentDB[id])

        fireDB.database().ref().child(`Attendance/AttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}/${localStorage.getItem('date')}`).push(`${studentDB[id].FIELD3} is Absent`, (err) => {
          if (err) {
            console.log(err);
          }
        })

        // Student Attendance Profile

        // fireDB.database().ref().child(`Attendance/StudentAttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('setSubject')}/${localStorage.getItem('date')}/${studentDB[id].roll}`).push(`${absent}`, (err) => {
        fireDB.database().ref().child(`Attendance/StudentAttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}/${localStorage.getItem('date')}/${studentDB[id].FIELD3}`).push(`${absent}`, (err) => {
          if (err) {
            console.log(err);
          }
        })

        // Student Attendance Profile

        fireDB.database().ref().child(`Attendance/StudentAttendanceProfile/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}/${localStorage.getItem('date')}/${studentDB[id].FIELD3}`).set(`${absent}`, (err) => {
          if (err) {
            console.log(err);
          }
        })

      }
    })



    i = i + 1;
    setInitial(i)
  }

  const reload = (e) => {
    e.preventDefault();

    fireDB.database().ref().child(`Attendance/AttendanceDB/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}/${localStorage.getItem('date')}`).remove()



    window.location.reload();
  }

  const handleUpload = () => {

    let x = subject.classes + 1;

    fireDB.database().ref().child(`Attendance/Subjects/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}`).set({ classes: x, subjectCode: localStorage.getItem('setSubject') }, (err) => {
      if (err) {
        console.log(err);
      } else {
        alert("Attendance Sheet Update Successfully!!!")
        navigate('/attendancePage')
      }
    })



    if (initial2 !== 1) {
      fireDB.database().ref().child(`Attendance/ClassDates/${localStorage.getItem('selectYear')}/${localStorage.getItem('selectDepartment')}/${localStorage.getItem('SelectSemester')}/${localStorage.getItem('setSubject')}`).push(localStorage.getItem('date'), (err) => {
        if (err) {
          console.log(err);
        }
      })
    }



  }

  return (
    <div>
      <AdminNavbar />
      <button className='attendance_reload_btn' onClick={reload}>RELOAD</button>

      {/* AttendanceDB section / Side Container */}
      <div className='attendance_db_container_1'>
        {Object.keys(value).map((id, index) => {
          return (
            <div>
              <p className='attendance_db_container_1_p1'>{value[id]}</p>
            </div>
          )
        })}

      </div>
      <div className='attendance_db_container_2'>
        <h1 className='attendance_container_1_head' >{semester}</h1>
        {/* <p className='attendance_container_1_p_1'>Subject :- {localStorage.getItem('setSubject')} </p> */}
        <p className='attendance_container_1_p_1'>Subject :- {localStorage.getItem('setSubject')}  </p>
        <p className='attendance_container_1_p_1'>Number of this Class is :- {subject.classes + 1} </p>
        {Object.keys(studentDB).map((id, index) => {
          return (
            <div>
              {index === i ? <h3 className='attendance_db_container_2_h3'>Current Roll Call :- </h3> : null}

              {index === i ?
                // <h3 className='attendance_db_container_2_h3'>{studentDB[id].name} - {studentDB[id].roll}</h3>

                <div className='attendance_name_roll_container'>
                  <p className='attendance_name_roll_container_p1'>{studentDB[id].FIELD2}</p>
                  <p className='attendance_name_roll_container_p2'>{studentDB[id].FIELD3}</p>
                </div>

                : null}
            </div>
          )
        })}

      </div>

      <div className='attendance_container_1_subcontainer_1'>
        <button className='btn attendance_container_1_subcontainer_1_btn_1' onClick={handlePresent}>Present</button>
        <button className='btn attendance_container_1_subcontainer_1_btn_2' onClick={handleAbsent}>Absent</button>
        <button className='btn attendance_container_1_subcontainer_1_btn_3' onClick={handleUpload}>Upload</button>
      </div>

      {/* <Footer/> */}
    </div>
  )
}

export default Attendance