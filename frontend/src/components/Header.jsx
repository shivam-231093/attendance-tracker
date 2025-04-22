import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'; // Add useLocation
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useAuth();
  const location = useLocation(); // Get current route

  return (
    <div className={theme === "Dark" ? "dark border-b border-white" : "light border-b border-black"}>
    <div className="flex justify-between items-center p-4 border-b border-gray-800">
    <h1 className="text-lg">Attendance Tracker</h1>
    <div className="flex gap-10 items-center">
    {/* Dynamic Navigation Button */}
    {currentUser && (
      location.pathname === '/dashboard' ? (
        <NavLink
        to="/"
        className="text-gray-400 text-xl pt-1 hover:text-white"
        >
        Home
        </NavLink>
      ) : (
        <NavLink
        to="/dashboard"
        className="text-gray-400 text-xl pt-1 hover:text-white"
        >
        Dashboard
        </NavLink>
      )
    )}

    {/* Existing Auth Links */}
    {currentUser ? (
      <>
      <span className="text-gray-400 text-xl hover:text-white">
      {currentUser?.displayName || currentUser?.email}
      </span>
      <NavLink to='/logout' className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300">
      Logout
      </NavLink>
      </>
    ) : (
      <>
      <NavLink to='/login' className="text-gray-400 text-xl pt-1 hover:text-white">
      Login
      </NavLink>
      <NavLink to='/register' className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300">
      Register
      </NavLink>
      </>
    )}
    </div>
    </div>
    </div>
  )
}
