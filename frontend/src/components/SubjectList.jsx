import React from 'react';
import Subject from './Subject';

export default function SubjectList({ onAttendanceSubmit, reset }) {
  //data to be fetched from backend
  const subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Electrical' },
    { id: 3, name: 'Engineering Drawing' },
    { id: 4, name: 'Language Lab' },
    { id: 5, name: 'English' },
  ];

  return (
    <>
      {subjects.map((subject) => (
        <Subject key={subject.id} subject={subject} onAttendanceSubmit={onAttendanceSubmit} reset={reset} />
      ))}
    </>
  );
}
