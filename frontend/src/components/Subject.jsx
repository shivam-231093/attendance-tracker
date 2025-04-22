import React from 'react'
import { useState } from 'react';

export default function Subject({subject , onAttendanceSubmit }) {

  const [attendance, setAttendance] = useState(''); // State to manage attendance (Present/Absent/No Class/GT)
  
  const handleAttendanceClick = (status) => {
    setAttendance(status);
    onAttendanceSubmit(subject.id, status); // Pass the attendance data to the parent
  };



  return (
    <div className='border-gray-100 border-b border-r p-5 text-xl m-5 rounded-lg bg-gray-900 text-white'>
        <h4>{subject.name}</h4>
        <div className='mt-10 flex gap-16 text-sm font-normal '>
            <button 
            onClick={() => handleAttendanceClick('Present')}
            className='border-black border-2 p-2 bg-gray-800 rounded-lg'>PRESENT</button>
            <button 
            onClick={() => handleAttendanceClick('Absent')}
            className='border-black border-2 p-2 bg-gray-800 rounded-lg'>ABSENT</button>
            <button 
            onClick={() => handleAttendanceClick('No class')}
            className='border-black border-2 p-2 bg-gray-800 rounded-lg'>NO CLASS</button>
            <button 
            onClick={() => handleAttendanceClick('GT')}
            className='border-black border-2 p-2 bg-gray-800 rounded-lg'>GT(grace time)</button>
        </div>

    </div>
  )
}
