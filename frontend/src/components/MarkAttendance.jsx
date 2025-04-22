import React, { useState, useContext } from 'react';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; // Import the default styles for the calendar
import SubjectList from './SubjectList';

export default function MarkAttendance() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to manage the selected date
  const [attendanceData, setAttendanceData] = useState({}); // State to store attendance for all subjects
  const [reset, setReset] = useState(false); // State to trigger reset in Subject components


  const { theme, font } = useContext(ThemeContext);


  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date
  };

  const handleAttendanceSubmit = (subjectId, status) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [subjectId]: status, // Update attendance for the specific subject
    }));
  };

  const saveAttendance = () => {
    console.log('Attendance Data:', attendanceData);
    alert('Attendance saved successfully!');
    setAttendanceData({});
    setReset(true); // Trigger reset
    setTimeout(() => setReset(false), 0); // Reset the `reset` state after triggering
    };

    return (
        <div className={`${theme === "Dark" ? "dark border border-white" : "light border border-black"} w-full ${
            font === "Small"
              ? "font-small-text"
              : font === "Medium"
              ? "font-medium-text"
              : "font-large-text"
          }`}>
        <div className="min-h-screen">
            <div className={`${
            font === "Small"
              ? "font-small-heading"
              : font === "Medium"
              ? "font-medium-heading"
              : "font-large-heading"
            } p-4 pb-0 font-bold
            sm:max-w-full max-w-min`}>
                Mark Attendance
            </div>
                <p className="p-4 pt-0 text-gray-400 font-normal">
Mark your presence effortlessly and stay on track with your commitments. Record Today, Succeed Tomorrow!
</p>

            <div className='font-bold mb-20 flex lg:flex-row flex-col p-5 h-auto w-full'>
                                
                <div 
                className={`${theme === "Dark" ? "darkcalender border-white" : "lightcalender border-black"} p-4 rounded-lg mt-4 mr-4 calendar-container border lg:w-1/4 lg:h-auto h-1/4`}>
                    <h2 className={`${
            font === "Small"
              ? "font-small-heading"
              : font === "Medium"
              ? "font-medium-heading"
              : "font-large-heading"
          } p-2 mb-5`}>Select Date</h2>
                    <Calendar
                        value={selectedDate}
                        onChange={handleDateChange} // Allow date selection
                        tileClassName={({ date, view }) => {
                            const today = new Date();
                            return date.getDate() === today.getDate() &&
                                date.getMonth() === today.getMonth() &&
                                date.getFullYear() === today.getFullYear();
                        }}
                    />
                </div>

                <div
                className={`${theme === "Dark" ? "dark border-white" : "light border-black"} p-2 rounded-lg mt-4  lg:w-5/6 w-[97%] border`}>
                <div className='flex flex-row items-center'>
                    <div>
                        <h2 className= {`${
            font === "Small"
              ? "font-small-heading"
              : font === "Medium"
              ? "font-medium-heading"
              : "font-large-heading"
          } p-3 m-2 mb-0 pb-0 font-bold`}>
                        Mark Attendance for: {selectedDate.toDateString()}
                        </h2>
                        <h4 className='pl-5 pb-5 text-gray-400 font-normal'>Select attendance status for each subject</h4>
                    </div>
                    <button 
                    onClick={saveAttendance}
                    className={`${theme === "Dark" ? "darkselect border-white" : "lightselect border-black"} rounded  h-1/6 p-2 ml-auto mr-9 border`}>
                    SAVE</button>
                    
                </div>
                    
                    <SubjectList onAttendanceSubmit={handleAttendanceSubmit} reset={reset}/>
                </div>

            </div>     
            
        </div>
        </div>
    );
}
