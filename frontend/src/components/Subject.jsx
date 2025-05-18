import React, { useState, useEffect } from 'react';

export default function Subject({ subject, onAttendanceSubmit, reset, theme }) {
  const [attendance, setAttendance] = useState('');

  // Reset attendance when the reset prop changes
  useEffect(() => {
    if (reset) {
      setAttendance('');
    }
  }, [reset]);

  const handleAttendanceClick = (status) => {
    setAttendance(status);
    onAttendanceSubmit(subject.name, status); // Pass the attendance data to the parent
  };

  // Function to determine button styling based on selection state
  const getButtonStyle = (buttonStatus) => {
    const isSelected = attendance === buttonStatus;

    const baseStyle = 'border-2 p-2 rounded-lg transition-all duration-200';

    // Theme-aware styling
    const themeStyle = theme === 'Dark'
    ? 'border-black bg-gray-800 hover:bg-gray-700'
    : 'border-gray-300 bg-gray-100 hover:bg-gray-200';

    // Selection styling
    const selectionStyle = isSelected
    ? 'ring-2 ring-blue-500 font-bold shadow-md'
    : '';

    return `${baseStyle} ${themeStyle} ${selectionStyle}`;
  };

  return (
    <div className={`border-gray-100 border-b border-r p-5 m-5 rounded-lg ${theme === 'Dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} shadow-sm transition-shadow hover:shadow-md`}>
    <h4 className="text-xl font-medium">{subject.name}</h4>

    <div className='mt-6 flex flex-wrap gap-4 text-sm font-normal'>
    <button
    onClick={() => handleAttendanceClick('Present')}
    className={`${getButtonStyle('Present')} ${attendance === 'Present' ? 'bg-green-600 text-white' : ''}`}
    >
    PRESENT
    </button>

    <button
    onClick={() => handleAttendanceClick('Absent')}
    className={`${getButtonStyle('Absent')} ${attendance === 'Absent' ? 'bg-red-600 text-white' : ''}`}
    >
    ABSENT
    </button>

    <button
    onClick={() => handleAttendanceClick('No class')}
    className={`${getButtonStyle('No class')} ${attendance === 'No class' ? 'bg-yellow-600 text-white' : ''}`}
    >
    NO CLASS
    </button>

    <button
    onClick={() => handleAttendanceClick('GT')}
    className={`${getButtonStyle('GT')} ${attendance === 'GT' ? 'bg-blue-600 text-white' : ''}`}
    >
    GT (GRACE TIME)
    </button>
    </div>
    </div>
  );
}
