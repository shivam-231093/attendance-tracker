import React from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Components
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import MarkAttendance from './components/MarkAttendance';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Schedule from './components/Schedule';
import Reports from './components/Reports';
import { PrivateRoute, ProfileGuard, MainLayout } from './components/PrivateRoute';
import Logout from './components/LogOut';
import Account from './components/Account'
import Notification from './components/Notification'
import Privacy from './components/Privacy'
import Appearance from './components/Appearance'


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
    <Route element={<ProfileGuard />}>
    <Route element={<MainLayout />}>
    {/* Profile route is accessible regardless of profile completion */}
    <Route path='/profile' element={<Profile />} />

    {/* These routes are accessible only after profile completion */}
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/Settings' element={<Settings activesection="Account" />}/>
    <Route path='/Settings/Account' element={<Settings activesection="Account" />}/>
    <Route path='/Settings/Notification' element={<Settings activesection="Notification" />}/>
    <Route path='/Settings/Privacy' element={<Settings activesection="Privacy" />}/>
    <Route path='/Settings/Appearance' element={<Settings activesection="Appearance" />}/>
    <Route path='/markAttendance' element={<MarkAttendance />} />
    <Route path='/reports' element={<Reports />} />
    <Route path='/schedule' element={<Schedule />} />
    <Route path='/logout' element={<Logout />} />
    </Route>
    </Route>
    </Route>

    {/* Fallback */}
    <Route path='*' element={<Navigate to="/" />} />
    </Routes>
    </div>
  );
};

export default App;
