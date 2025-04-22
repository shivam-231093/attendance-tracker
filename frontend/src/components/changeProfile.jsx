import React, { useState } from 'react';
import Dashboard from './Dashboard';

const ChangeProfile = () => {
  const [profile, setProfile] = useState({
    fullName: 'Jack',
    phoneNumber: '9487983264',
    email: 'jack23@gmail.com',
    rollNumber: '0201CS2410000',
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile({ ...formData });
    alert('Profile saved successfully!');
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      {/* Sidebar only visible on large screens */}
      <div className="hidden lg:block">
        <Dashboard />
      </div>

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">My Profile</h2>
          <button
            onClick={handleSave}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition duration-200"
          >
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Personal Information</h3>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-700 rounded-full mb-4"></div>
              <p className="text-lg font-semibold">{profile.fullName}</p>
              <p className="text-gray-400">{profile.email}</p>
              <p className="text-gray-500">Student ID: CS2023001</p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Account Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p><span className="font-semibold">Branch:</span> Computer Science</p>
                <p><span className="font-semibold">Semester:</span> Semester 3</p>
              </div>
              <div>
                <p><span className="font-semibold">Year:</span> Second Year</p>
                <p><span className="font-semibold">Semester Duration:</span> January 15, 2024 - May 30, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangeProfile;
