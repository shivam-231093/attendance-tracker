import React from 'react';
import './index.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Components
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import MarkAttendance from './components/MarkAttendance';
import Profile from './components/Profile';
import SideBar from './components/SideBar';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Reports from './components/Reports';
import ChangeProfile from './components/changeProfile';
import { PrivateRoute, SettingsRoute } from './components/PrivateRoute';
import Logout from './components/LogOut';

const MainLayout = () => (
  <div className='flex flex-row w-auto'>
  <SideBar />
  <div className="flex-grow">
  <Outlet />
  </div>
  </div>
);

const ProfileLayout = ({ children }) => (
  <div className="flex-1">
  <Outlet />
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen min-w-screen">
    <ToastContainer />
    <Header />

    <Routes>
    {/* 🌐 Public Routes */}
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />

    {/* 🔒 Private Routes */}
    <Route element={<PrivateRoute />}>
    {/* Profile Section - Accessible with/without completed profile */}
    <Route element={<ProfileLayout />}>
    <Route path='/profile' element={<Profile />} />
    <Route path='/changeProfile' element={<ChangeProfile />} />
    </Route>

    {/* 🛡️ Completed Profile Routes */}
    <Route element={<SettingsRoute />}>
    <Route element={<MainLayout />}>
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/settings' element={<Settings />} />
    <Route path='/markAttendance' element={<MarkAttendance />} />
    <Route path='/reports' element={<Reports />} />
    <Route path="/logout" element={<Logout />} />
    </Route>
    </Route>
    </Route>
    </Routes>
    </div>
  );
};

export default App;
