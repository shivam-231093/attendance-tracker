import React from 'react'
import RiskSubjectsList from './RiskSubjectsList'
import './Appearance.css';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function SubjectDashboard() {
    const { theme, font } = useContext(ThemeContext);
  
  return (
    <div className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      } sm:max-w-full  rounded-lg `}>
        <div className='p-4'>
            <h1 className={`${font === "Small"
          ? "font-small-heading"
          : font === "Medium"
          ? "font-medium-heading"
          : "font-large-heading"} font-bold`}>Subject-wise Attendance</h1>
            <p className='text-gray-400'>Detailed breakdown of your attendance by Subjects</p>
        </div>
        {/* All subject list 
        with present classes and
        <div>
            {overallPercentage >= 75 ? (
              <p className="text-green-500">You are above the required 75%</p>
            ) : (
              <p className="text-red-500">
                ! Require {75 - overallPercentage}% to meet 75%
              </p>
            )}
          </div>
        */}
        <div className='p-4'>
          <RiskSubjectsList />
        </div>
        
      
    </div>
  )
}
