import React from 'react'
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';


export default function Insights() {
      const { theme, font } = useContext(ThemeContext);
    
  return (
    <div className="min-h-screen">
        <div  
        className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} ${
            font === "Small"
              ? "font-small-text"
              : font === "Medium"
              ? "font-medium-text"
              : "font-large-text"
          } flex flex-col sm:max-w-full rounded-lg `}>
             <div className='p-4'>
                <h1 className={` ${
        font === "Small"
          ? "font-small-heading"
          : font === "Medium"
          ? "font-medium-heading"
          : "font-large-heading"
      } font-bold`}>Attendance Insights</h1>
                <p className='text-gray-400'>Smart recommendations to improve your attendance</p>
            </div>
            <div className='p-4 border  rounded-lg m-4'>
                <h1>Attendance Prediction</h1>
                <p>Based on your current attendance pattern, your projected end of semester attendance is 80% </p>

            </div>
            <div className='p-4 border  rounded-lg m-4' >
                <h1>Improvement Plan</h1>
                <p>You need to attend 32 more classes out of remaining.</p>

            </div>
            <div className='p-4 border  rounded-lg m-4'>
                <h1>Day-wise analysis</h1>
                <p>Your attendanceis lowest on Mondays.</p>

            </div>
        </div>
      
    </div>
  )
}
