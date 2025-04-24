import React, { useEffect, useState } from 'react';
import Rsubject from './Rsubject';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function RiskSubjectsList({ showOnlyAtRisk = false }) {
  const { currentUser, authFetch } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This is the attendance threshold for subjects at risk
  const RISK_THRESHOLD = 75;

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!currentUser) return;

      try {
        const res = await authFetch("/attendance/summary");
        const subjectWise = res.subject_wise;

        const allSubjects = Object.entries(subjectWise).map(([name, info], index) => ({
          id: index + 1,
          name: name,
          attend: info.percentage,
        }));

        // Sort by attendance ASCENDING (lowest first)
        const sorted = allSubjects.sort((a, b) => a.attend - b.attend);

        // Filter subjects if showOnlyAtRisk is true
        const filteredSubjects = showOnlyAtRisk
        ? sorted.filter(subject => subject.attend < RISK_THRESHOLD)
        : sorted;

        setSubjects(filteredSubjects);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, [currentUser, authFetch, showOnlyAtRisk]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
      <div className="animate-pulse text-gray-400">Loading subjects...</div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="flex justify-center items-center h-32 text-gray-500">
      {showOnlyAtRisk ? 'No subjects at risk' : 'No subjects available'}
      </div>
    );
  }

  return (
    <div className="space-y-3">
    {subjects.map((subject, index) => (
      <Rsubject key={subject.id} rsubject={subject} index={index} />
    ))}
    </div>
  );
}
