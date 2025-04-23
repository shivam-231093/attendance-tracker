import React from 'react';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Rsubject({ rsubject, index }) {
  const { theme, font } = useContext(ThemeContext);
  const isDark = theme === "Dark";

  const fontSizeClass =
  font === "Small" ? "font-small-text" :
  font === "Medium" ? "font-medium-text" : "font-large-text";

  // Determine color based on attendance percentage
  const getColorClass = (percentage) => {
    if (percentage < 50) return isDark ? "bg-red-500" : "bg-red-500";
    if (percentage < 75) return isDark ? "bg-amber-500" : "bg-amber-500";
    return isDark ? "bg-green-500" : "bg-green-500";
  };

  return (
    <div
    className={`${isDark ? "dark border border-gray-700" : "light border border-gray-200"} ${fontSizeClass} flex flex-col rounded-lg mb-3 p-4 shadow-sm`}
    >
    <div className="flex flex-row items-center">
    {rsubject.attend < 75 && (
      <AlertTriangle size={16} className="text-amber-500 mr-2" />
    )}
    <div className="font-medium">{rsubject.name}</div>
    <div className={`ml-auto font-semibold ${
      rsubject.attend < 75 ? 'text-amber-500' : 'text-green-500'
    }`}>
    {rsubject.attend}%
    </div>
    </div>

    <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden mt-3">
    <div
    className={`absolute top-0 left-0 h-full ${getColorClass(rsubject.attend)} transition-all duration-500`}
    style={{ width: `${rsubject.attend}%` }}
    ></div>
    </div>
    </div>
  );
}
