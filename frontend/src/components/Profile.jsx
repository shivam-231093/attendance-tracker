import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from "react-toastify";

const Profile = () => {

  const navigate = useNavigate();
  const { authFetch,currentUser,setProfileCompleted } = useAuth();

  const [formData, setFormData] = useState({
    uid:currentUser.uid,
    roll_number: "",
    branch: "",
    year: "",
    name: currentUser.displayName,
    email:currentUser.email,
    semester: "",
    startDate: "",
    subjects: [],
  });

  const [availableSubjects, setAvailableSubjects] = useState([]);

  const branches = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Industrial Production",
    "Mechatronics",
  ];

  const curriculum = {
    "Computer Science": {
      "1": {
        "1": ["Mathematics I", "Physics", "Introduction to Programming"],
        "2": ["Mathematics II", "Electronics", "Environmental Science"],
      },
      "2": {
        "3": ["Data Structures", "Computer Architecture", "Discrete Mathematics"],
        "4": ["Operating Systems", "DBMS", "Object-Oriented Programming"],
      },
      "3": {
        "5": ["Computer Networks", "Software Engineering", "Theory of Computation"],
        "6": ["Web Technologies", "AI", "Machine Learning"],
      },
      "4": {
        "7": ["Cyber Security", "Blockchain", "Data Mining"],
        "8": ["Cloud Computing", "Project", "Seminar"],
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    const { branch, year, semester } = {
      ...formData,
      [name]: value,
    };

    if (branch && year && semester) {
      const subjectsList = curriculum[branch]?.[year]?.[semester] || [];
      setAvailableSubjects(subjectsList);

      setFormData((prev) => ({
        ...prev,
        subjects: prev.subjects.filter((s) => subjectsList.includes(s)),
      }));
    }
  };

  const handleSubjectChange = (subject) => {
    setFormData((prev) => {
      const updatedSubjects = prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects: updatedSubjects };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authFetch('/auth/create-or-update-user', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          profileCompleted: true
        })
      });
      setProfileCompleted(true);
      toast.success("Account Created Successfully")
      navigate('/dashboard');


    } catch (error) {
      console.error("error while saving profile", error.message);
    }
  };


  return (
    <div className="flex-1 bg-black min-h-screen flex justify-center px-4 py-8">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 sm:p-10 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-full text-center relative">
            <h1 className="text-2xl sm:text-3xl font-bold">Attendance Tracker</h1>
            <NavLink
              to="/"
              className="absolute right-0 top-1 text-xl hover:text-red-400"
            >
              X
            </NavLink>
          </div>
        </div>

        <p className="text-gray-400 text-center mb-6">Complete Your Profile</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              placeholder="0201CS241025"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            >
              <option value="">Select branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            >
              <option value="">Select year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            >
              <option value="">Select Semester</option>
              {[...Array(8)].map((_, index) => (
                <option key={index + 1} value={(index + 1).toString()}>
                  {index + 1} {["st", "nd", "rd"][index] || "th"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-center mb-3">
              Select Subjects
            </label>
            {availableSubjects.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {availableSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={subject}
                      checked={formData.subjects.includes(subject)}
                      onChange={() => handleSubjectChange(subject)}
                      className="w-4 h-4 mr-2"
                    />
                    <label htmlFor={subject}>{subject}</label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center">
                Select Branch, Year, and Semester to see subjects
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

