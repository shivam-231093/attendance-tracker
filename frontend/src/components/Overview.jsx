import React from "react";
import LineChart from "./Chart";
import RiskSubjectsList from "./RiskSubjectsList";
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';


export default function Overview() {
  const overallPercentage = 60; // Example percentage
  const totalWorkingDays = 120;
  const presentDays = 92;
  const absentDays = totalWorkingDays - presentDays;
  const remainingDays = totalWorkingDays - presentDays;

    const { theme, font } = useContext(ThemeContext);
  
  return (
    <>
      <div 
      className={`${theme === "Dark" ? "dark" : "light"} ${
        font === "Small"
          ? "font-small-heading"
          : font === "Medium"
          ? "font-medium-heading"
          : "font-large-heading"
      } grid grid-cols-2 md:grid-flow-col md:auto-cols-fr md:gap-[4vw] gap-[1vw] md:max-w-full py-4`}>
        {/* Overall Section */}
        <div className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} h-auto  flex flex-col rounded-lg p-4`}>
          <p className={` ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      } font-semibold`}>Overall Attendance</p>
          <div className="mt-1 font-bold">{overallPercentage}%</div>
      
          <div className="relative w-full h-6 bg-gray-700 rounded-full overflow-hidden mt-2">
            <div
              className="absolute top-0 left-0 h-full bg-gray-300 transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            ></div>
          </div>

          <div className={` ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      }`}>
            {overallPercentage >= 75 ? (
              <p className="text-green-500">You are above the required 75%</p>
            ) : (
              <p className="text-red-500">
                ! Require {75 - overallPercentage}% to meet 75%
              </p>
            )}
          </div>
        </div>

        {/* Present Section */}
        <div 
        className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} h-auto rounded-lg p-4`}>
          <p className={` ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      } font-semibold`}>Present Days</p>
          <h1 className=" pl-0 p-4 font-bold">{presentDays}</h1>
          <p className={` ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      } `}>out of {totalWorkingDays} working days</p>
        </div>

        {/* Absent Section */}
        <div className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} h-auto  rounded-lg p-4`}>
          <p className={` ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      } font-semibold`}>Absent Days</p>
          <h1 className=" pl-0 p-4 font-bold">{absentDays}</h1>
          <p className={` ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      }`}>out of {totalWorkingDays} working days</p>
        </div>

        {/* Remaining Section */}
        <div className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} h-auto  rounded-lg p-4`}>
          <p className={` ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      } font-semibold`}>Remaining Days</p>
          <h1 className="pl-0 p-4 font-bold">{remainingDays}</h1>
          <p className={` ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      } `}>out of {totalWorkingDays} working days</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 mt-4 max-w-screen">
        <div 
        className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} rounded-lg mt-4 p-4 flex flex-col lg:w-1/2 `}>
        <div className={` ${
        font === "Small"
          ? "font-small-heading"
          : font === "Medium"
          ? "font-medium-heading"
          : "font-large-heading"
      } font-semibold`}>Attendance Trend</div>
        <div className=" text-gray-400">Your attendance over the last 3 months</div>
        <div className="mt-16 w-full">
          <LineChart />
        </div>
      </div>

      <div 
      className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} rounded-lg mt-4 p-4 flex flex-col lg:w-1/2`}>
            <div className={` ${
        font === "Small"
          ? "font-small-heading"
          : font === "Medium"
          ? "font-medium-heading"
          : "font-large-heading"
      } font-semibold`}>Subjects at risk</div>
            <div className="text-gray-400">Subjects below required attendance</div>
            <div className="mt-4 pt-4">
              <RiskSubjectsList />
            </div>
      </div>
      </div>
      
    </>
  );
}
