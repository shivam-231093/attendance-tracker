import React, { useContext, useState } from 'react';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Appearance() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [font, setFont] = useState("Small");

  const saveSettings = () => {
    const settings = {
      theme,
      font,
    };
    console.log('Saved Settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className={`${theme === "Dark" ? "dark border-white" : "light border-black"} border rounded-lg w-full`}>
      <div className="p-4">
        <div className="p-4">
          <h1 className="font-bold text-2xl">Appearance Settings</h1>
          <h5 className="text-[#9fa0a1]">Customise how the application looks</h5>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col ml-4 mb-6">
          <div className='font-bold'>Theme</div>
          <select
            name="Theme"
            className={`${theme === "Dark" ? "dark" : "light"} rounded border mt-3 p-2`}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        <div className="flex flex-col ml-4  mb-6">
          <div className='font-bold'>Font</div>
          <select
            name="Font"
            className={`${theme === "Dark" ? "dark" : "light"} rounded border mt-3 p-2 mb-3`}
            onChange={(e) => setFont(e.target.value)}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <button
          className={`${theme === "Dark" ? "darkselect border-white" : "lightselect border-black"} p-2 ml-4 rounded-lg hover:scale-110 duration-200 hover:cursor-pointer font-bold border `}
          onClick={saveSettings}
        >
          Save Appearance Settings
        </button>
      </div>
    </div>
  );
}
