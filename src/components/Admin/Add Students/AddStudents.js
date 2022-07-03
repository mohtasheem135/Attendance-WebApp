import React, { useEffect, useState } from 'react';
import fireDB from '../../../firebase';
import AdminNavbar from '../../Navbar.js/AdminNavbar';
import "./addStudents.css";
import mydata from "../../../Data/data2.json"

const AddStudents = () => {

    const [data, setData] = useState('');
    const [value, setValue] = useState('');
    const [year, setYear] = useState(null);
    const [department, setDepartment] = useState(null);
    const [flag, setFlag] = useState(false);

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [files, setFiles] = useState('');


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

    const handelClick1 = (e) => {
        localStorage.setItem('year', e.target.value)
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

    const handelClick2 = (e) => {
        localStorage.setItem('department', e.target.value)
        setDepartment(e.target.value)
        e.target.style.backgroundColor = '#a3b18a';
    }

    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
        setFlag(true)
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            setFiles(JSON.parse(e.target.result));
        };
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        fireDB.database().ref().child(`Attendance/StudentDB/${localStorage.getItem('year')}/${localStorage.getItem('department')}`).set(files, (err) => {
            if (err) {
                console.log(err);
            } else {
                alert("Done");
                window.location.reload()
            }
        })

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

            <div className="input-upload">
                <label className='custom-file-input-lb'>

                    <input type="file" class="custom-file-input" name="file" onChange={changeHandler} />
                </label>
                {/* <p className="input-text">Drag and Drop the File here</p> */}
                {isFilePicked ? (
                    <div className='file-details-container'>
                        <p className='file-details-p'><b>Filename:</b> {selectedFile.name}</p>
                        <p className='file-details-p'><b>Filetype:</b> {selectedFile.type}</p>
                        <p className='file-details-p'><b>Size in bytes:</b> {selectedFile.size}</p>
                        <p className='file-details-p'>
                            <b>Last Modified Date:</b>{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p className="display-input">Choose the File</p>
                )}
            </div>
            {flag === true ? <button onClick={handelSubmit} className='studentsbtn_container_admin_1_inp_container_btn' >Submit</button> : null}
        </div>
    )
}

export default AddStudents