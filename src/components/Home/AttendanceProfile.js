import React, { useEffect, useState } from 'react'
import fireDB from '../../firebase';
import Navbar from '../Navbar.js/Navbar';
import img_1 from "../../Resources/img_4.jpg"

const AttendanceProfile = () => {

    const [data, setData] = useState('');
    const [initial, setInitial] = useState(0);
    const [attendance, setAttendance] = useState('')

    const [present, setPresent] = useState(0)
    const [absent, setAbsent] = useState(0)
    const [initial2, setInitial2] = useState(0);
    const [attendancePercentage, setAttendancePercentage] = useState('')

    useEffect(() => {

        fireDB.database().ref().child(`Attendance/ClassDates/${localStorage.getItem('profileYear')}/${localStorage.getItem('profileDepartment')}/${localStorage.getItem('profileSemester')}/${localStorage.getItem('profileSubjects')}`).on('value', (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        })

    }, [])

    useEffect(() => {
        run();
    })

    var i = initial;
    var p = present;
    var a = absent;
    var j = initial2;

    const run = () => {

        Object.keys(data).map((id, index) => {
            if (index === i) {
                console.log(i + "  is  " + data[id])
                fireDB.database().ref().child(`Attendance/StudentAttendanceProfile/${localStorage.getItem('profileYear')}/${localStorage.getItem('profileDepartment')}/${localStorage.getItem('profileSemester')}/${localStorage.getItem('profileSubjects')}/${data[id]}/${localStorage.getItem('profileRoll')}`).on('value', (snapshot) => {
                    if (snapshot.val() != null) {
                        setAttendance(snapshot.val())
                        if (snapshot.val() == 1) {
                            // console.log("PRESENT :- " + snapshot.val())
                            p = p + 1;
                            setPresent(p);
                        } else {
                            // console.log("ABSENT :- " + snapshot.val())
                            a = a + 1;
                            setAbsent(a);
                        }
                    } else {
                        snapshot({});
                    }
                })
                // console.log(data[id] + "  -:kk :-  " + attendance[0])
                i = i + 1;
                setInitial(i)
            }

        })

        var percent = 100/((present+absent)/present);
        setAttendancePercentage(percent)

    }

    return (
        <div>
            <Navbar />
            <div className='home-attendanceprofile-container-1'>
                <p className='home-attendanceprofile-container-1-p'>Batch : <b>{localStorage.getItem('profileYear')}</b></p>
                <p className='home-attendanceprofile-container-1-p'>Department : <b>{localStorage.getItem('profileDepartment')}</b></p>
                <p className='home-attendanceprofile-container-1-p'>Semester : <b>{localStorage.getItem('profileSemester')}</b></p>
                <p className='home-attendanceprofile-container-1-p'>Subjects : <b>{localStorage.getItem('profileSubjects')}</b></p>
                <p className='home-attendanceprofile-container-1-p'>Roll-No : <b>{localStorage.getItem('profileRoll')}</b></p>
            </div>

            <p className='home-attendanceprofile-container-1-p2'>Total Number of Classes = {present + absent}</p>

            <div className='home-attendanceprofile-container-1-h1-container'>
                <h2 className='home-attendanceprofile-container-1-h1'>Present : {present} Classes</h2>
                <h2 className='home-attendanceprofile-container-1-h1'>Absent : {absent} Classes</h2>

            </div>
            <h1 className='home-attendanceprofile-container-1-h1'>Attendance Percentage :- {attendancePercentage}%</h1>
            <img className='attendanceProfile-img-1' src={img_1} />
        </div>
    )
}

export default AttendanceProfile