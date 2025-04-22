"use client";
import React from 'react';
import { VscFilePdf } from "react-icons/vsc";
import { FaRegFileExcel } from "react-icons/fa";
import { GrDocumentCsv } from "react-icons/gr";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';

const data = [
    { Month: 'Jan', Attendance: 30},
    { Month: 'Feb', Attendance: 45},
    { Month: 'Mar', Attendance: 28 },
    { Month: 'Apr', Attendance: 60 },
    { Month: 'May', Attendance: 75 },
    { Month: 'Jun', Attendance: 90 },
    { Month: 'Jul', Attendance: 30},
    { Month: 'Aug', Attendance: 45},
    { Month: 'Sep', Attendance: 28 },
    { Month: 'Oct', Attendance: 60 },
    { Month: 'Nov', Attendance: 75 },
    { Month: 'Dec', Attendance: 90 },
  
  ];

function Reports() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className={`${theme === "Dark" ? "dark" : "light"} min-h-screen w-full ${
      font === "small"
      ? "font-small-text"
      : font === "Medium"
      ? "font-medium-text"
      : "font-large-text"
  }`}/>
  
      <div className="md:flex m-4 md:gap-4">
        {/* Filters Section */}
        <div className="flex flex-col outline rounded-md w-full my-4 p-4 md:w-1/4">
          <h1 className="font-bold text-lg md:text-3xl md:mb-4">Filters</h1>

          <p className="mt-2 md:text-xl md:mb-2">Report Period</p>
          <select className="p-2 rounded-lg bg-black md:text-xl">
            <option>Current Semester</option>
            <option>Last Month</option>
            <option>Last Week</option>
            <option>Custom Range</option>
          </select>

          <p className="mt-2 md:text-xl md:mb-2 md:mt-4">Report Type</p>
          <select className="p-2 rounded-lg md:text-xl bg-black">
            <option>All Subjects</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Computer Science</option>
            <option>Electronics</option>
            <option>Chemistry</option>
            <option>Machine Learning</option>
          </select>

          <button className="md:mt-6 rounded-md py-2 hover:bg-gray-700 transition hover:-translate-y-0.5 motion-reduce:transition-none my-4 bg-gray-800 md:text-xl">
            Apply Filters
          </button>
        </div>

        {/* Attendance Summary Section */}
        <div className="md:w-3/4">
          <div className="flex flex-col justify-between outline rounded-md my-4 p-4">
            <h1 className="font-bold text-lg md:text-3xl">Attendance Summary</h1>
            <p className="mb-4 md:text-xl">
              Overall attendance statistics for the current semester
            </p>

            <div className="flex justify-between md:gap-2 md:text-xl">
              {['Overall Attendance', 'Present Days', 'Absent Days', 'Total classes'].map((label, idx) => (
                <div className="flex flex-col" key={idx}>
                  <p>{label}</p>
                  <div className="w-10 h-10 mx-auto bg-white rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* View Toggle Buttons */}
          <div className="rounded-md hover:bg-gray-700 focus:outline-offset-2 md:my-8 md:text-xl flex my-4 justify-between bg-gray-800 px-4 py-2">
            {['Monthly', 'Subject-Wise', 'Status-Wise', 'Day-Wise'].map((label, idx) => (
              <button
                key={idx}
                className="rounded-sm py-2 px-4 focus:bg-black transition hover:-translate-y-0.5 motion-reduce:transition-none"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Monthly Trend */}
          <div className="h-[450px]  rounded-md my-2  md:text-xl">
            <div className="outline  my-4   w-full h-[400px] p-4 rounded-2xl shadow-lg  bg-gray-800">
                  <h2 className=" font-bold text-lg md:text-3xl  text-white  mb-4">Monthly Attendance Trend</h2>
                  <p className='text-white'>Your attendance percentage month by month</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke='#444' strokeDasharray="3 3" />
                      <XAxis stroke='white' dataKey="Month" />
                      <YAxis stroke='white' tickFormatter={(Attendance) => `${Attendance}%`} />
                      <Tooltip formatter={(Attendance) => `${Attendance}%`} contentStyle={{ backgroundColor: "#000", borderColor: "white" }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: "white" }}
            />
                      <Legend />
                      <Line type="monotone" dataKey="Attendance" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
          </div>
          <div className="  outline rounded-md my-4 p-4">
            <h1 className="font-bold text-lg md:text-3xl">Downloadable Reports</h1>
            <p className="mb-4 md:text-xl">Export your attendance data in different formats</p>
            <div className='flex justify-between '>
            
            <div className="outline-double p-2 flex ">
            <VscFilePdf color='white' className='self-center text-3xl ' />
             <div>
                <button className='md:text-xl  rounded-md p-2 hover:bg-gray-700 transition hover:-translate-y-0.5 motion-reduce:transition-none '>PDF Report</button>
                <p>Detailed attendance report</p>
            </div>
            </div>
            <div className="outline-double p-2 flex">
            <FaRegFileExcel color='white' className='self-center text-3xl '/>
             <div>
                <button className='md:text-xl  rounded-md p-2 hover:bg-gray-700 transition hover:-translate-y-0.5 motion-reduce:transition-none '>Excel Export</button>
                <p>Raw attendance data</p>
            </div>
            </div>
            <div className="outline-double p-2 flex">
            <GrDocumentCsv color='white' className='self-center text-3xl '/>
            <div>
                <button className='md:text-xl  rounded-md p-2 hover:bg-gray-700 transition hover:-translate-y-0.5 motion-reduce:transition-none  '>CSV Export</button>
                <p>For data analysis</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Reports;
