import React, { useEffect, useState } from 'react';
import fireDB from '../../firebase';
import Navbar from '../Navbar.js/Navbar';
import "./print.css"

const Print = () => {

    const [data, setData] = useState('')

    useEffect(() => {
        fireDB.database().ref().child(`Attendance WebApp`).child(`${localStorage.getItem('setSemester')}/${localStorage.getItem('setDate')}${localStorage.getItem('setMonth')}${localStorage.getItem('setYear')}`).on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
    }, [])

    function handlePrint() {
        window.print()
    }

    return (
        <div>
            <Navbar />
            <div className='print_head_cc'>
            <h1 className='print_head_cc_head'>{localStorage.getItem('setSemester')}</h1>
            <p className='print_head_cc_para'>{localStorage.getItem('setDate')}/{localStorage.getItem('setMonth')}/{localStorage.getItem('setYear')}</p>
            
            </div>
            {/* <br /> */}
            <div className='print_container_1'>
                {Object.keys(data).map((id, index) => {
                    return (

                        <div className='print_container_2'>
                           <p className='print_p_1'>{data[id]}</p> 
                            
                        </div>
                    )
                })}
            </div>
            <button className='print_btn' onClick={handlePrint}>Print</button>
        </div>
    )
}

export default Print