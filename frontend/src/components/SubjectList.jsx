import React from 'react';
import Subject from './Subject';

export default function SubjectList({ onAttendanceSubmit, reset, subjects, theme }) {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
      <p>No subjects found. Please add subjects to your profile.</p>
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
