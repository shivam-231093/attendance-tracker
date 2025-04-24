import React, { useState, useContext, useEffect } from 'react';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SubjectList from './SubjectList';
import { toast } from 'react-toastify';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
  <p className="ml-3 text-gray-500">Loading subjects...</p>
  </div>
);

export default function MarkAttendance() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});
  const [allSubjects, setAllSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reset, setReset] = useState(false);

  const { theme, font } = useContext(ThemeContext);
  const { authFetch } = useAuth();

  // Fetch all subjects when component mounts
  useEffect(() => {
    fetchAllSubjects();
  }, []);

  // Function to fetch all subjects from the planner
  const fetchAllSubjects = async () => {
    setIsLoading(true);
    try {
      // Use the planner API to get all subjects
      const plannerData = await authFetch("/planner/get-planner");

      // Extract subjects array from planner data
      const subjects = plannerData.subjects || [];

      // Format subjects as needed for SubjectList
      const formattedSubjects = subjects.map((subjectName, index) => ({
        id: index.toString(),
                                                                      name: subjectName
      }));

      setAllSubjects(formattedSubjects);
    } catch (err) {
      console.error("Failed to fetch subjects from planner", err);
      toast.error("Could not load your subjects. Please try again.");
      setAllSubjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle date change from calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAttendanceData({}); // Reset attendance data when date changes
  };

  // Update attendance status for a subject
  const handleAttendanceSubmit = (subjectName, status) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [subjectName]: status,
    }));
  };

  // Save attendance data to server
  const saveAttendance = async () => {
    // Check if any attendance is marked
    if (Object.keys(attendanceData).length === 0) {
      toast.warning("Please mark attendance for at least one subject");
      return;
    }

    setIsSubmitting(true);
    try {
      await authFetch("/attendance/mark", {
        method: "POST",
        body: JSON.stringify({
          date: selectedDate.toISOString().split("T")[0],
                             attendance: attendanceData,
        }),
      });
      toast.success('Attendance marked successfully!');
      setAttendanceData({});
      setReset(true);
      setTimeout(() => setReset(false), 100);
    } catch (err) {
      console.error("Failed to mark attendance", err);
      toast.error('Failed to mark attendance. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
    } p-4 pb-0 font-bold sm:max-w-full max-w-min`}>
    Mark Attendance
    </div>
    <p className="p-4 pt-0 text-gray-400 font-normal">
    Mark your presence effortlessly and stay on track with your commitments. Record Today, Succeed Tomorrow!
    </p>

    <div className='font-bold mb-20 flex lg:flex-row flex-col p-5 h-auto w-full'>
    {/* Calendar Section */}
    <div className={`${theme === "Dark" ? "darkcalender border-white" : "lightcalender border-black"} p-4 rounded-lg mt-4 mr-4 calendar-container border lg:w-1/4 lg:h-auto h-1/4`}>
    <h2 className={`${
      font === "Small"
      ? "font-small-heading"
      : font === "Medium"
      ? "font-medium-heading"
      : "font-large-heading"
    } p-2 mb-5`}>Select Date</h2>
    <Calendar
    value={selectedDate}
    onChange={handleDateChange}
    tileClassName={({ date }) => {
      const today = new Date();
      return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
      ? "bg-blue-400 text-white rounded-md"
      : null;
    }}
    disabled={isSubmitting}
    />
    </div>

    {/* Attendance Section */}
    <div className={`${theme === "Dark" ? "dark border-white" : "light border-black"} p-2 rounded-lg mt-4 lg:w-5/6 w-[97%] border`}>
    <div className='flex flex-row items-center'>
    <div>
    <h2 className={`${font === "Small" ? "font-small-heading" : font === "Medium" ? "font-medium-heading" : "font-large-heading"} p-3 m-2 mb-0 pb-0 font-bold`}>
    Mark Attendance for: {selectedDate.toDateString()}
    </h2>
    <h4 className='pl-5 pb-5 text-gray-400 font-normal'>Select attendance status for each subject</h4>
    </div>

    <button
    onClick={saveAttendance}
    disabled={isSubmitting || isLoading}
    className={`${theme === "Dark" ? "darkselect border-white" : "lightselect border-black"} rounded h-1/6 p-2 ml-auto mr-9 border bg-green-500 hover:bg-green-600 text-white font-bold
    ${(isSubmitting || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
    {isSubmitting ? 'SAVING...' : 'SAVE'}
    </button>
    </div>

    {/* Subject List with Loading State */}
    {isLoading ? (
      <LoadingSpinner />
    ) : (
      <div className="p-2">
      {allSubjects.length > 0 ? (
        <SubjectList
        onAttendanceSubmit={handleAttendanceSubmit}
        reset={reset}
        subjects={allSubjects}
        theme={theme}
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
        <p>No subjects found.</p>
        <p className="mt-2 text-sm">Please update your profile with subjects.</p>
        </div>
      )}
      </div>
    )}
    </div>
    </div>
    </div>
    </div>
  );
}
