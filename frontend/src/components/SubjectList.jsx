import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Subject from './Subject';

export default function SubjectList({ onAttendanceSubmit, reset, plannedSubjects, theme }) {
  const { authFetch, currentUser } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!currentUser || !plannedSubjects || plannedSubjects.length === 0) {
        setSubjects([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await authFetch("/planner/get-planner");
        const allSubjects = res.subjects || {};

        // Convert subjects to array format with id and name
        const entries = Object.entries(allSubjects).map(([id, name]) => ({
          id,
          name,
        }));

        // Filter based on planned subjects for the selected date
        const filtered = plannedSubjects.length > 0
        ? entries.filter((subj) => plannedSubjects.includes(subj.name))
        : [];

        setSubjects(filtered);
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
        setSubjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, [currentUser, authFetch, plannedSubjects]);

  if (isLoading) {
    return <div className="text-center py-4">Loading subjects...</div>;
  }

  if (subjects.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
      <p>No matching subjects found for this day.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
    {subjects.map((subject) => (
      <Subject
      key={subject.id}
      subject={subject}
      onAttendanceSubmit={onAttendanceSubmit}
      reset={reset}
      theme={theme}
      />
    ))}
    </div>
  );
}
