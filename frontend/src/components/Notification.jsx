import React, { useState, useContext } from 'react';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { Switch, FormControlLabel } from '@mui/material';

export default function Notification() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [attendanceReminders, setAttendanceReminders] = useState(false);
  const [lowAttendanceAlerts, setLowAttendanceAlerts] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(false);


    const { theme, font } = useContext(ThemeContext);

  const saveSettings = () => {
    const settings = {
      emailNotifications,
      pushNotifications,
      attendanceReminders,
      lowAttendanceAlerts,
      weeklyReports,
    };
    console.log('Saved Settings:', settings);
    alert('Settings saved successfully!');
  };

  const switchStyles = {
    '& .MuiSwitch-switchBase': {
      color: '#b0b0b0', // Gray thumb when OFF
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#2196f3', // Blue thumb when ON
    },
    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
      backgroundColor: '#b0b0b0', // Gray track when OFF
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#2196f3', // Blue track when ON
    },
  };

  return (
    <div className={`${theme === "Dark" ? "dark border-white" : "light border-black"} border rounded-lg w-full ${
        font === "Small"
          ? "font-small-text"
          : font === "Medium"
          ? "font-medium-text"
          : "font-large-text"
      }`}>
      <div className=" p-4">
        <div className="p-4">
          <h1 className={`${
        font === "Small"
          ? "font-small-heading"
          : font === "Medium"
          ? "font-medium-heading"
          : "font-large-heading"
      } font-bold`}>Notification Settings</h1>
          <h5 className="text-gray-400 mr-4">Manage how you receive notifications</h5>
        </div>

        <div className="p-4">
          {/* Email Notifications */}
          <div className="flex justify-between items-center">
            <div>
              Email Notifications
              <p className="text-gray-400 mr-4">Receive notifications via email</p>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications((prev) => !prev)}
                  sx={switchStyles}
                />
              }
              label=""
            />
          </div>

          {/* Push Notifications */}
          <div className="flex justify-between items-center pt-8 pb-4">
            <div>
              Push Notifications
              <p className="text-gray-400 mr-4">Receive notifications on your device</p>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={pushNotifications}
                  onChange={() => setPushNotifications((prev) => !prev)}
                  sx={switchStyles}
                />
              }
              label=""
            />
          </div>

          <hr />

          <div>
            <p className={`${
        font === "Small"
          ? "font-small-heading"
          : font === "Medium"
          ? "font-medium-heading"
          : "font-large-heading"
      } font-bold pt-8 pb-5`}>Notification Types</p>

            {/* Attendance Reminders */}
            <div className="flex justify-between items-center">
              <div>
                Attendance Reminders
                <p className="text-gray-400 mr-4">Daily reminders to mark your attendance</p>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    checked={attendanceReminders}
                    onChange={() => setAttendanceReminders((prev) => !prev)}
                    sx={switchStyles}
                  />
                }
                label=""
              />
            </div>

            {/* Low Attendance Alerts */}
            <div className="flex justify-between items-center pt-5 pb-5">
              <div>
                Low Attendance Alerts
                <p className="text-gray-400 mr-4">Get alerts when your attendance falls below required percentage</p>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    checked={lowAttendanceAlerts}
                    onChange={() => setLowAttendanceAlerts((prev) => !prev)}
                    sx={switchStyles}
                  />
                }
                label=""
              />
            </div>

            {/* Weekly Reports */}
            <div className="flex justify-between items-center pb-4">
              <div>
                Weekly Reports
                <p className="text-gray-400 mr-4">Receive weekly attendance summary reports</p>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    checked={weeklyReports}
                    onChange={() => setWeeklyReports((prev) => !prev)}
                    sx={switchStyles}
                  />
                }
                label=""
              />
            </div>

          </div>
        </div>
          <button
            className={`${theme === "Dark" ? "darkselect border-white" : "lightselect border-black"} p-2 ml-4 rounded-lg hover:scale-110 duration-200 hover:cursor-pointer font-bold border `}
            onClick={saveSettings}
            >Save Notification Settings
          </button>
      </div>
      
    </div>
  );
}
