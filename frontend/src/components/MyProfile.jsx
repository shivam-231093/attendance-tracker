import React from 'react';
import { FaRegEdit } from "react-icons/fa";
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';

const MyProfile = () => {
    return (
        <div className="bg-gray-900">
        <div className={`${theme === "Dark" ? "dark" : "light"} min-h-screen w-full ${
            font === "small"
            ? "font-small-text"
            : font === "Medium"
            ? "font-medium-text"
            : "font-large-text"
        }`}/>
        <div className="flex justify-between my-4 px-4">
        <h1 className="text-white place-self-center md:text-3xl">My Profile</h1>
        <div className='flex'>
        <FaRegEdit color='white' className='self-center  ' />
        <button className="text-white bg-black rounded-md px-2 py-2 hover:bg-gray-700 focus:outline-offset-2 md:text-xl">
        Edit Profile
        </button>
        </div>
        </div>
        <div className='flex '>

        <div className="p-4 w-1/2 text-white bg-black border-white rounded-md m-2 outline">
        <h2 className="md:text-xl">Personal Information</h2>
        <p className="text-gray-400 md:text-lg">Your Personal details and information</p>
        <div className="flex md:gap-6 flex-col items-center justify-center">
        <div className="md:text-lg my-4 w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center">
        {/* Profile Image */}
        </div>
        <div className="md:text-lg mb-2 w-20 h-5 mx-auto bg-white rounded flex items-center justify-center">
        {/* Placeholder */}
        </div>
        <div className="md:text-lg mb-2 w-20 h-5 mx-auto bg-white rounded flex items-center justify-center">
        {/* Placeholder */}
        </div>
        <div className="flex">
        <p className="md:text-lg">Student ID: </p>
        <div className="md:text-lg w-24 h-5 mx-auto bg-white rounded"></div>
        </div>
        <div className='flex  '>
        <FaRegEdit className='self-center ml-2'/>
        <button className="my-2  md:text-lg hover:bg-gray-700 text-white bg-black rounded-md px-2 py-2">
        Edit Profile
        </button>
        </div>
        </div>
        </div>


        <div className="flex flex-col w-1/2">
        <div className="p-4 text-white bg-black rounded-md m-2 outline">
        <h3 className="md:text-xl">Account Details</h3>
        <p className="text-gray-400 mb-4 md:text-lg">Update your personal information</p>
        <div className="flex justify-between">
        <div className="flex flex-col md:text-lg">
        <p>Full Name</p>
        <span className="w-24 h-5 mx-auto bg-white"></span>
        </div>
        <div className="flex flex-col md:text-lg">
        <p>Email Address</p>
        <span className="w-24 h-5 mx-auto bg-white"></span>
        </div>
        </div>

        <div className="flex justify-between gap-5 my-4">
        <div className="flex flex-col md:text-lg">
        <p>Phone Number</p>
        <span className="w-24 h-5 mx-auto bg-white"></span>
        </div>
        <div className="flex flex-col md:text-lg">
        <p>Roll Number</p>
        <span className="w-24 h-5 mx-auto bg-white"></span>
        </div>
        </div>
        </div>

        <div className="p-4 text-white bg-black rounded-md m-2 outline">
        <h4 className="md:text-xl">Academic information</h4>
        <p className="text-gray-400 mb-4 md:text-lg">Your academic details and enrolled courses</p>
        <div className="flex justify-between md:text-lg">
        <div className="flex flex-col">
        <p className="text-gray-400">Branch</p>
        <span className="w-24 h-5 mx-auto bg-white"></span>
        </div>
        <div className="flex flex-col">
        <p className="text-gray-400">Year</p>
        <span className="w-24 h-5 mx-auto bg-white"></span>
        </div>
        </div>

        <div className="flex justify-between my-4 md:text-lg">
        <div className="flex flex-col">
        <p className="text-gray-400">Semester</p>
        <span className="w-24 h-5 mx-auto bg-white"></span>
        </div>
        <div className="flex flex-col">
        <p className="text-gray-400">Semester Duration</p>
        <span className="w-24 h-5 mx-auto bg-white"></span>
        </div>
        </div>

        <p className="text-gray-400 md:text-lg">Enrolled Subjects</p>
        <div className="flex justify-between gap-2 md:text-lg">
        <div className="w-24 h-5 mx-auto bg-white rounded-full"></div>
        <div className="w-24 h-5 mx-auto bg-white rounded-full"></div>
        <div className="w-24 h-5 mx-auto bg-white rounded-full"></div>
        <div className="w-24 h-5 mx-auto bg-white rounded-full"></div>
        <div className="w-24 h-5 mx-auto bg-white rounded-full"></div>
        <div className="w-24 h-5 mx-auto bg-white rounded-full"></div>
        </div>

        <div className="rounded my-5 text-center">
        <button className="hover:bg-gray-700 px-6 py-2 rounded-md outline md:text-xl">
        Update Academic Information
        </button>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default MyProfile;
