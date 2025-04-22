import React, { useState } from "react";
import Dashboard from "./Dashboard";

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthName = (monthIndex) => {
    return new Date(0, monthIndex).toLocaleString("default", { month: "long" });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return newDate;
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center px-4 py-2">
        <button onClick={goToPreviousMonth}>◀</button>
        <h2 className="text-xl font-semibold text-white">
          {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
        </h2>
        <button onClick={goToNextMonth}>▶</button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-1 px-4">
        {days.map((day, index) => (
          <div
            key={index}
            className="text-center text-sm font-medium text-white"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const totalSlots = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const daysArray = Array.from({ length: totalSlots }, (_, index) => {
      const dayNum = index - firstDay + 1;
      return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null;
    });

    const rows = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      rows.push(
        <div className="grid grid-cols-7 gap-1 px-4" key={i}>
          {daysArray.slice(i, i + 7).map((day, idx) => (
            <div
              key={idx}
              className="h-20 flex justify-center items-start border border-gray-700 text-white text-sm rounded-lg"
            >
              {day}
            </div>
          ))}
        </div>
      );
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      <div className="w-full lg:w-auto">
        <Dashboard />
      </div>

      <main className="flex-1 p-4 md:p-6">
        <div className="bg-zinc-1000 rounded-lg shadow-lg p-4">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      </main>

      <aside className="w-full lg:w-80 p-4 bg-zinc-900 space-y-6">
        <div>
          <h2 className="font-bold text-white text-lg mb-2">Monthly Summary</h2>
          <div className="font-semibold space-y-1 text-sm">
            <p>Present Days: 0</p>
            <p>Absent Days: 0</p>
            <p>Total Working Days: 0</p>
            <p>Attendance Percentage: 0%</p>
          </div>
        </div>
        <div></div>
      </aside>
    </div>
  );
};

export default AttendanceCalendar;
