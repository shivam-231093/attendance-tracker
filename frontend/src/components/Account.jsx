import React, { useState, useContext } from "react";
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Account() {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState(false);

  const { theme , font} = useContext(ThemeContext);

  const saveSettings = () => {
    if (password !== cpassword) {
      setError(true);
      return;
    }
    setError(false);

    const settings = {
      password,
    };
    console.log("Saved Settings:", settings);
    alert("Password changed successfully!")
    setCPassword("");
    setPassword("");
  };

  return (
    <div className={`${
      font === "Small"
        ? "font-small-text"
        : font === "Medium"
        ? "font-medium-text"
        : "font-large-text"
    } ${theme === "Dark" ? "dark border-white" : "light border-black"}
border rounded-lg`}>
      <div className=" p-4">
        <div className="p-4">
          <h1 className={`${
        font === "Small"
          ? "font-small-heading"
          : font === "Medium"
          ? "font-medium-heading"
          : "font-large-heading"
      } font-bold`}>Account Settings</h1>
          <h5 className="mb-4 text-gray-400">
            Manage your account details and security
          </h5>
        </div>

        <div>
          <div className="flex flex-col ml-4">
            <div>Email address</div>
            <div className=" h-4 mt-2 rounded"></div>
          </div>

          <div className="p-4 flex flex-col">
            <p className="py-3">Change Password</p>
            <div>
              <div className=" py-2">Current Password </div>
              <input
                type="password"
                className={`${theme === "Dark" ? "dark" : "light"} border-b rounded border-gray-800 border-spacing-0.5 w-full`}
              />

              <div>
                <div className=" py-2">New Password </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${theme === "Dark" ? "dark" : "light"} border-b rounded border-gray-800 border-spacing-0.5 w-full`}
                />
              </div>

              <div>
                <div className=" py-2">Confirm New Password </div>
                <input
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  className={`border-b rounded w-full ${
                    error ? "border-red-500" : "border-gray-800"
                  } ${theme === "Dark" ? "dark" : "light"}`}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match.
                  </p>
                )}
              </div>

              <button
                className={`${theme === "Dark" ? "darkselect" : "lightselect"} p-2 mt-5 rounded-lg hover:scale-95 duration-200 hover:cursor-pointer`}
                onClick={saveSettings}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
