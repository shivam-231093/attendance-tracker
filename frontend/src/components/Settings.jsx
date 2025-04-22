import React, { useState, useContext } from 'react';
import Notification from './Notification';
import Appearance from './Appearance';
import Privacy from './Privacy';
import Account from './Account';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('Appearance'); // Default section
  const { theme, font } = useContext(ThemeContext);

  return (
    <>
      <div className={`${theme === "Dark" ? "dark" : "light"} min-h-screen w-full ${
              font === "Small"
                ? "font-small-text"
                : font === "Medium"
                ? "font-medium-text"
                : "font-large-text"
            }`}>
        <div className="flex flex-col max-w-full p-5 rounded-lg">
          <h1
            className={`font-bold p-2 ${
              font === "Small"
                ? "font-small-heading"
                : font === "Medium"
                ? "font-medium-heading"
                : "font-large-heading"
            }`}
          >
            Settings
          </h1>
          <div
            className={`${
              theme === "Dark" ? "bg-[#333333]" : "bg-[#f0f0f0]"
            } sm:flex-row flex-col p-3 mb-5 w-fit rounded-xl`}
          >
            <button
              className={`${
                activeSection === 'Account'
                  ? theme === "Dark"
                    ? "darkactive"
                    : "lightactive"
                  : ''
              } mr-4`}
              onClick={() => setActiveSection('Account')}
            >
              Account
            </button>

            <button
              className={`${
                activeSection === 'Notification'
                  ? theme === "Dark"
                    ? "darkactive"
                    : "lightactive"
                  : ''
              } mr-4`}
              onClick={() => setActiveSection('Notification')}
            >
              Notifications
            </button>

            <button
              className={`${
                activeSection === 'Appearance'
                  ? theme === "Dark"
                    ? "darkactive"
                    : "lightactive"
                  : ''
              } mr-4`}
              onClick={() => setActiveSection('Appearance')}
            >
              Appearance
            </button>

            <button
              className={`${
                activeSection === 'Privacy'
                  ? theme === "Dark"
                    ? "darkactive"
                    : "lightactive"
                  : ''
              } mr-4`}
              onClick={() => setActiveSection('Privacy')}
            >
              Privacy
            </button>
          </div>

          <div
            className={`rounded-lg p-5 pl-0 ${
              font === "Small"
                ? "font-small-text"
                : font === "Medium"
                ? "font-medium-text"
                : "font-large-text"
            } mr-4`}
          >
            {activeSection === 'Account' && <Account />}
            {activeSection === 'Appearance' && <Appearance />}
            {activeSection === 'Notification' && <Notification />}
            {activeSection === 'Privacy' && <Privacy />}
          </div>
        </div>
      </div>
    </>
  );
}
