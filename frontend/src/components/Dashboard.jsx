import React from 'react'
import { useState, useContext } from 'react';
import Overview from './Overview';
import Insights from './Insights';
import SubjectDashboard from './SubjectDashboard';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Dashboard() {
      const [activeSection, setActiveSection] = useState('Overview'); // Default section
      const { theme, font } = useContext(ThemeContext);
      
    
  return (
    <>
      <div className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} w-full  ${
            font === "Small"
              ? "font-small-heading"
              : font === "Medium"
              ? "font-medium-heading"
              : "font-large-heading"
          } `}>

        <div className=" flex flex-col p-5 pt-2 rounded-lg">
          <div className="font-bold p-2">Dashboard</div>
          <div className={`${
              theme === "Dark" ? "bg-[#333333]" : "bg-[#f0f0f0]"
            } flex flex-row p-3 mb-5 w-fit space-x-8 rounded-xl ${
              font === "Small"
                ? "font-small-text"
                : font === "Medium"
                ? "font-medium-text"
                : "font-large-text"
            } mb-8`}>
          <button
          onClick={() => setActiveSection('Overview')}
          className={`${
            activeSection === 'Overview'
              ? theme === "Dark"
                ? "darkactive"
                : "lightactive"
              : ''
          }`}
            >
              Overview
            </button>
            <button
          onClick={() => setActiveSection('Subjects')}
          className={`${
            activeSection === 'Subjects'
              ? theme === "Dark"
                ? "darkactive"
                : "lightactive"
              : ''
          }`}
            >
              Subjects
            </button>
            <button
          onClick={() => setActiveSection('Insights')}
          className={`${
            activeSection === 'Insights'
              ? theme === "Dark"
                ? "darkactive"
                : "lightactive"
              : ''
          }`}
            >
              Insights
            </button>
        </div> 

              <div className={`rounded-lg ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      }`}>
                          
          {activeSection === 'Overview' && <Overview />}
          {activeSection === 'Subjects' && <SubjectDashboard />}
          {activeSection === 'Insights' && <Insights />}
         </div>
        </div>
        </div>
    </>
  )
}
