import React from 'react'
import './index.css'
import Home from './components/Home'
import { Route, Router, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import MarkAttendance from './components/MarkAttendance'
import Profile from './components/Profile'
import SideBar from './components/SideBar'
import Settings from './components/Settings'
import Dashboard from './components/Dashboard'
import Header from './components/Header'

const App = () => {
  return (
    <div className='min-h-screen min-w-screen'>
      <Header />
    <div className='flex flex-row gap-0 w-auto '>
      <SideBar />
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/SideBar' element={<SideBar></SideBar>}/>
        <Route path='/Login' element={<Login></Login>}/>
        <Route path='/Profile' element={<Profile></Profile>}/>
        <Route path='/Register' element={<Register></Register>}/>
        <Route path='/Dashboard' element={<Dashboard></Dashboard>}/>
        <Route path='/Settings' element={<Settings></Settings>}/>
        <Route path='/MarkAttendance' element={
          <MarkAttendance />
        }>
        </Route>
      </Routes>
    </div>
    </div>
  )
}

export default App
