import React from 'react';
import Login from '../components/Login';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      
      <div className="flex flex-col md:flex-row justify-between pt-20 pr-12 pl-12 pb-12">
        <div className='pt-5'>
          <h2 className="text-5xl font-bold">Track Your College<br /> Attendance</h2>
          <p className="text-gray-400 mt-4 max-w-lg">
            Stay on top of your attendance requirements with our easy-to-use tracker. Monitor your progress, get insights, and never fall below the required percentage.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-300">Get Started</button>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-black">Learn More</button>
          </div>
        </div>

        <div className="mt-12 md:mt-0 flex justify-center">
          <div className="w-[400px] h-[300px] bg-white rounded-xl flex justify-center items-center">
            {/* Image or content can go here */}
          </div>
        </div>
      </div>

      <div className="bg-black py-16 px-12 text-center border-t border-white">
        <h2 className="text-4xl font-bold">Key Features</h2>
        <p className="text-gray-400 mt-4">Everything you need to track and improve your attendance</p>
        <div className="flex flex-col md:flex-row justify-center mt-10 gap-10">

          <div className="w-full md:w-1/3 bg-black p-8 rounded-lg border border-white">
            <h3 className="text-xl font-semibold mt-4">Personalized Planner</h3>
            <p className="text-gray-400 mt-2">Get a customized attendance planner based on your branch, year, and subjects.</p>
          </div>

          <div className="w-full md:w-1/3 bg-black p-8 rounded-lg border border-white">
            <h3 className="text-xl font-semibold mt-4">Easy Attendance Marking</h3>
            <p className="text-gray-400 mt-2">Mark your attendance with a simple click - Present, Absent, No Class, or Grace Time.</p>
          </div>

          <div className="w-full md:w-1/3 bg-black p-8 rounded-lg border border-white">
            <h3 className="text-xl font-semibold mt-4">Smart Insights</h3>
            <p className="text-gray-400 mt-2">Get real-time calculations and insights on how to improve your attendance percentage.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
