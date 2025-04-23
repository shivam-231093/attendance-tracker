import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Home, Layout, User } from 'lucide-react'; // Import icons

export default function Header() {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useAuth();
  const location = useLocation();

  const isDark = theme === "Dark";

  // Function to get first letter of name or email for avatar
  const getInitial = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName[0].toUpperCase();
    } else if (currentUser?.email) {
      return currentUser.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <header className={`${isDark ? "dark bg-gray-900" : "light bg-white"} border-b ${isDark ? "border-gray-700" : "border-gray-200"} shadow-sm`}>
    <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6">
    <div className="flex items-center gap-2">
    <h1 className={`font-medium text-xl ${isDark ? "text-white" : "text-gray-800"}`}>
    Attendance Tracker
    </h1>
    </div>

    <div className="flex items-center gap-6">
    {/* Dynamic Navigation Button with icon */}
    {currentUser && (
      location.pathname === '/dashboard' ? (
        <NavLink
        to="/"
        className={`flex items-center gap-1.5 ${isDark ? "text-gray-300" : "text-gray-600"} hover:${isDark ? "text-white" : "text-gray-900"} transition-colors duration-200`}
        >
        <Home size={18} />
        <span>Home</span>
        </NavLink>
      ) : (
        <NavLink
        to="/dashboard"
        className={`flex items-center gap-1.5 ${isDark ? "text-gray-300" : "text-gray-600"} hover:${isDark ? "text-white" : "text-gray-900"} transition-colors duration-200`}
        >
        <Layout size={18} />
        <span>Dashboard</span>
        </NavLink>
      )
    )}

    {/* Auth Links with refined styling */}
    {currentUser ? (
      <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
      {/* Avatar circle */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? "bg-indigo-600" : "bg-indigo-500"} text-white font-medium`}>
      {getInitial()}
      </div>
      <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} max-w-[150px] truncate`}>
      {currentUser?.displayName || currentUser?.email}
      </span>
      </div>
      <NavLink
      to='/logout'
    className={`px-4 py-1.5 rounded-md text-sm font-medium ${isDark ?
      "bg-gray-700 text-white hover:bg-gray-600" :
      "bg-gray-200 text-gray-800 hover:bg-gray-300"}
      transition-colors duration-200 shadow-sm`}
      >
      Logout
      </NavLink>
      </div>
    ) : (
      <div className="flex items-center gap-4">
      <NavLink
      to='/login'
    className={`flex items-center gap-1 ${isDark ? "text-gray-300" : "text-gray-600"} hover:${isDark ? "text-white" : "text-gray-900"} transition-colors duration-200`}
    >
    <User size={18} />
    <span>Login</span>
    </NavLink>
    <NavLink
    to='/register'
    className={`px-4 py-1.5 rounded-md text-sm font-medium ${isDark ?
      "bg-indigo-600 text-white hover:bg-indigo-500" :
      "bg-indigo-500 text-white hover:bg-indigo-600"}
      transition-colors duration-200 shadow-sm`}
      >
      Register
      </NavLink>
      </div>
    )}
    </div>
    </div>
    </header>
  );
}
