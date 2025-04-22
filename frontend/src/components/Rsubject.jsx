import React from 'react'
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';

export default function Rsubject({rsubject}) {
        const { theme, font } = useContext(ThemeContext);
  
  return (
    <div 
    className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} ${
      font === "Small"
        ? "font-small-text"
        : font === "Medium"
        ? "font-medium-text"
        : "font-large-text"
    } flex flex-col rounded-lg mb-3 p-4`}>
        <div className='flex flex-row '>
           <div>{rsubject.name} </div>
            <div className='ml-auto'>{rsubject.attend}%</div>
        </div>
      
      <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden mt-2">
            <div
              className="absolute top-0 left-0 h-full bg-gray-300 transition-all duration-500"
              style={{ width: `${rsubject.attend}%` }}
            ></div>
          </div>
    </div>
  )
}
