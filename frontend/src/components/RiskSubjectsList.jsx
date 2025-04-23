import React, { useEffect, useState } from 'react';
import Rsubject from './Rsubject';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function RiskSubjectsList() {
  const { currentUser, authFetch } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

        // Sort by attendance ASCENDING
        const sorted = allSubjects.sort((a, b) => a.attend - b.attend);

        setSubjects(sorted);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, [currentUser, authFetch]);

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
      No subjects available
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
