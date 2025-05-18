import React, { useEffect, useState, useContext } from 'react';
import RiskSubjectsList from './RiskSubjectsList';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function SubjectDashboard() {
  const { theme, font } = useContext(ThemeContext);
  const { currentUser, authFetch } = useAuth();
  const [overallPercentage, setOverallPercentage] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!currentUser) return;
      try {
        const res = await authFetch('/attendance/summary');
        const subjectWise = res.subject_wise;

        const totalPresent = Object.values(subjectWise).reduce(
          (sum, s) => sum + s.present,
                                                               0
        );
        const totalClasses = Object.values(subjectWise).reduce(
          (sum, s) => sum + s.total,
                                                               0
        );

        const percentage = totalClasses > 0 ? (totalPresent / totalClasses) * 100 : 0;
        setOverallPercentage(percentage.toFixed(2));
      } catch (err) {
        console.error('Error loading overall percentage:', err.message);
      }
    };

    fetchSummary();
  }, [currentUser]);

  return (
    <div
    className={`${theme === 'Dark' ? 'dark border border-white' : 'light border border-black'} ${
      font === 'Small'
      ? 'font-small-text'
      : font === 'Medium'
      ? 'font-medium-text'
      : 'font-large-text'
    } sm:max-w-full rounded-lg`}
    >
    <div className="p-4">
    <h1
    className={`${
      font === 'Small'
      ? 'font-small-heading'
      : font === 'Medium'
      ? 'font-medium-heading'
      : 'font-large-heading'
    } font-bold`}
    >
    Subject-wise Attendance
    </h1>
    <p className="text-gray-400">
    Detailed breakdown of your attendance by subjects
    </p>
    </div>

    {/* Attendance Notice */}
    {overallPercentage && (
      <div
      className={`px-4 py-2 font-semibold ${
        overallPercentage >= 75 ? 'text-green-600' : 'text-red-600'
      }`}
      >
      {overallPercentage >= 75
        ? '🎉 You are above the required 75%'
    : `⚠️ You need ${Math.ceil(75 - overallPercentage)}% more to reach 75%`}
    </div>
    )}

    {/* Risk subjects list */}
    <div className="p-4">
    <RiskSubjectsList showOnlyAtRisk={false} />
    </div>
    </div>
  );
}
