import React from "react";
import { useState, useContext } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Privacy() {
  const [shareWithFaculty, setShareWithFaculty] = useState(false);
  const [AnalyticsCollection, setAnalyticsCollection] = useState(false);
  const [ProfileVisibility, setProfileVisibility] = useState(false);
  const [download, setDownload] = useState(false);
  const [clear, setClear] = useState(false);

  const { theme, font } = useContext(ThemeContext);
  

  const saveSettings = () => {
    const settings = {
      shareWithFaculty,
      AnalyticsCollection,
      ProfileVisibility,
    };
    console.log("Saved Settings:", settings);
    alert("Settings saved successfully!");
  };

  const switchStyles = {
    "& .MuiSwitch-switchBase": {
      color: "#b0b0b0", // Gray thumb when OFF
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#2196f3", // Blue thumb when ON
    },
    "& .MuiSwitch-switchBase + .MuiSwitch-track": {
      backgroundColor: "#b0b0b0", // Gray track when OFF
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#2196f3", // Blue track when ON
    },
  };

  return (
    <div className={`${theme === "Dark" ? "dark border-white" : "light border-black"} border rounded-lg ${
      font === "Small"
        ? "font-small-text"
        : font === "Medium"
        ? "font-medium-text"
        : "font-large-text"
    }`}>
      <div className="p-4 flex flex-row justify-between items-center">
        <div className="p-4">
          <h1 className={`${
        font === "Small"
          ? "font-small-heading"
          : font === "Medium"
          ? "font-medium-heading"
          : "font-large-heading"
      } font-bold`}>Privacy Settings</h1>
          <h5 className="text-[#9fa0a1]">
            Manage your privacy and data sharing preferences
          </h5>
        </div>
        <button
          className={`${theme === "Dark" ? "darkselect" : "lightselect"} font-bold p-2 mt-4 ml-4 rounded-lg hover:scale-95 duration-200 hover:cursor-pointer`}
          onClick={saveSettings}
        >
          Save Privacy Settings
        </button>
      </div>
      <div className="p-4 flex flex-col gap-6 ml-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <span>Share attendance with Faculty</span>
              <p className="text-[#9fa0a1] mr-4">
                Allow faculty members to view your attendance data
              </p>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={shareWithFaculty}
                  onChange={() => setShareWithFaculty((prev) => !prev)}
                  sx={switchStyles}
                />
              }
              label=""
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <span>Analytics Collection</span>
              <p className=" text-[#9fa0a1] mr-4">
                Allow us to collect anonymous usage data to improve the
                application
              </p>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={AnalyticsCollection}
                  onChange={() => setAnalyticsCollection((prev) => !prev)}
                  sx={switchStyles}
                />
              }
              label=""
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <span>Profile Visibility</span>
              <p className="text-[#9fa0a1] mr-4">
                Allow other students to see your profile and attendance
                statistics
              </p>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={ProfileVisibility}
                  onChange={() => setProfileVisibility((prev) => !prev)}
                  sx={switchStyles}
                />
              }
              label=""
            />
          </div>
        </div>
      </div>
      <hr />
      <div className=" p-4">
        <div className="p-4">
          <h1 className={`${
        font === "Small"
          ? "font-small-heading"
          : font === "Medium"
          ? "font-medium-heading"
          : "font-large-heading"
      } font-bold`}>Data Management</h1>
          <h5 className="text-[#9fa0a1]">Manage your personal data</h5>
        </div>
        <div className="p-4 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <span>Download Your Data</span>
              <p className="text-[#9fa0a1] ">
                Download a copy of your attendance records
              </p>
            </div>
            <button
              onClick={() => setDownload("true")}
              className={`${theme === "Dark" ? "darkselect" : "lightselect"} font-bold px-2.5 py-2 mt-4 ml-4 rounded-lg hover:scale-95 duration-200 hover:cursor-pointer`}
            >
              Download
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span>Clear Attendance History</span>
              <p className="text-[#9fa0a1] text-sm">
                Delete your attendance history for the current semester
              </p>
            </div>
            <button
              onClick={() => setClear("true")}
              className={`${theme === "Dark" ? "darkselect" : "lightselect"} font-bold px-2.5 py-2 mt-4 ml-4 rounded-lg hover:scale-95 duration-200 hover:cursor-pointer`}
            >
              Clear History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
