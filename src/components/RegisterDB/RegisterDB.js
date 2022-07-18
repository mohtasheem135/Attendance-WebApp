import React from 'react';
import Navbar from '../Navbar.js/Navbar';
import "./registerDb.css";
import Select from 'react-select';
import fireDB from '../../firebase';
import { useNavigate } from 'react-router';
import Footer from '../Footer/Footer';

const RegisterDB = () => {

    const navigate = useNavigate();

    const options1 = [
        { value: '1st Semester', label: '1st Semester' },
        { value: '2nd Semester', label: '2nd Semester' },
        { value: '3rd Semester', label: '3rd Semester' },
        { value: '4th Semester', label: '4th Semester' },
        { value: '5th Semester', label: '5th Semester' },
        { value: '6th Semester', label: '6th Semester' },
        { value: '7th Semester', label: '7th Semester' },
        { value: '8th Semester', label: '8th Semester' },
    ];

    const options2 = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
    ];

    const options3 = [
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
    ];


    function handelOptionSelect1(selectedOption) {
        // console.log("Sesion : " + selectedOption.value);
        localStorage.setItem('setSemester', selectedOption.value)
    }

    function handleInputChange(e) {
        // console.log(e.target.value)
        localStorage.setItem('setDate', e.target.value)
    }

    function handelOptionSelect2(selectedOption) {
        // console.log("Sesion : " + selectedOption.value);
        localStorage.setItem('setMonth', selectedOption.value)
    }

    function handelOptionSelect3(selectedOption) {
        // console.log("Sesion : " + selectedOption.value);
        localStorage.setItem('setYear', selectedOption.value)
    }

    function handleClick() {
        navigate('/print')
    }

    return (
        <div>
            <Navbar />

            <Select
                onChange={handelOptionSelect1}
                options={options1}
                className='options_1'
            />

            <div className='register_container_1'>
                <input onChange={handleInputChange} className='register_container_1_input_1' placeholder='Enter the Date' type="number" />
                <Select
                    onChange={handelOptionSelect2}
                    options={options2}
                    className='options_2'
                />
                <Select
                    onChange={handelOptionSelect3}
                    options={options3}
                    className='options_3'
                />
            </div>
            <button className='register_btn_2' onClick={handleClick}>See the List</button>
            <Footer />
        </div>
    )
}

export default RegisterDB