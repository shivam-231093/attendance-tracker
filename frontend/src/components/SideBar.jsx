import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function SideBar() {
  const { theme, font } = useContext(ThemeContext);

  return (
    <div className={`${theme === "Dark" ? "dark border-x border-white" : "light border-x border-black"} ${
      font === "Small"
        ? "font-small-text"
        : font === "Medium"
        ? "font-medium-text"
        : "font-large-text"
    } w-1/6`}>
      <div className="h-full flex flex-col">
        <NavLink to='/Dashboard' className="p-3">Dashboard</NavLink>
        <NavLink to='/Profile' className="p-3">Profile</NavLink>
        <NavLink to='/MarkAttendance' className="p-3">Mark Attendance</NavLink>
        <NavLink to='/Schedule' className="p-3">Schedule</NavLink>
        <NavLink to='/Reports' className="p-3">Reports</NavLink>
        <NavLink to='/Settings' className="p-3">Settings</NavLink>
        <NavLink to='/Logout' className="p-3">Logout</NavLink>
      </div>
    </div>
  );
}
