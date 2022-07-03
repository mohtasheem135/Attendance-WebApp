import React, { useState } from 'react'
import fireDB from '../../../firebase'

const AddSemester = () => {

    const [data, setData] = useState('')

    const change=(e)=> {
        setData(e.target.value)
    }

    const click=()=> {
        fireDB.database().ref().child(`Attendance/Semester`).push(data, (err)=> {
            if(err) {
                console.log(err);
            } else {
                alert("Done")
            }
        })
    }
    

  return (
    <div>
        <input onChange={change} placeholder='enter' />
        <button onClick={click}>Click</button>
    </div>
  )
}

export default AddSemester