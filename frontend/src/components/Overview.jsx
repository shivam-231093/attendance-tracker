import React, { useContext, useEffect, useState } from "react";
import LineChart from "./Chart";
import RiskSubjectsList from "./RiskSubjectsList";
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { BarChart2, Calendar, Check, X } from "lucide-react";

export default function Overview() {
  const { theme, font } = useContext(ThemeContext);
  const { currentUser, authFetch } = useAuth();

  const [overallPercentage, setOverallPercentage] = useState(0);
  const [presentDays, setPresentDays] = useState(0);
  const [totalWorkingDays, setTotalWorkingDays] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await authFetch("/attendance/summary");
        const subjectStats = Object.values(data.subject_wise);

        let totalPresent = 0;
        let totalClasses = 0;

        subjectStats.forEach(subject => {
          totalPresent += subject.present;
          totalClasses += subject.total;
        });

        const overall = totalClasses > 0 ? ((totalPresent / totalClasses) * 100).toFixed(2) : 0;
        setOverallPercentage(parseFloat(overall));
        setPresentDays(totalPresent);
        setTotalWorkingDays(totalClasses);

        // Add small delay to make animations more noticeable
        setTimeout(() => setIsLoaded(true), 100);
      } catch (error) {
        console.error("Error fetching summary:", error.message);
        setIsLoaded(true); // Still set loaded to show UI even if there's an error
      }
    };

    if (currentUser) fetchSummary();
  }, [currentUser, authFetch]);

    const absentDays = totalWorkingDays - presentDays;
    const remainingDays = totalWorkingDays - presentDays;

    // Define some animation variants
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.1 * index, duration: 0.5, ease: "easeOut" }
      })
    };

    const progressVariants = {
      hidden: { width: 0 },
      visible: {
        width: `${overallPercentage}%`,
        transition: { delay: 0.3, duration: 0.8, ease: "easeOut" }
      }
    };

    const isDark = theme === "Dark";
    const fontSizeClass =
    font === "Small" ? "font-small-text" :
    font === "Medium" ? "font-medium-text" : "font-large-text";

    const headingFontClass =
    font === "Small" ? "font-small-heading" :
    font === "Medium" ? "font-medium-heading" : "font-large-heading";

    return (
      <>
      <div className={`${isDark ? "dark" : "light"} ${headingFontClass} grid grid-cols-2 md:grid-flow-col md:auto-cols-fr md:gap-6 gap-4 md:max-w-full py-4`}>
      {/* Overall Section */}
      <motion.div
      className={`${isDark ? "dark border border-gray-700" : "light border border-gray-200"} h-auto flex flex-col rounded-lg p-5 shadow-sm`}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={cardVariants}
      custom={0}
      >
      <div className="flex items-center">
      <BarChart2 className={`${isDark ? "text-gray-300" : "text-gray-700"} mr-2`} size={18} />
      <p className={`${fontSizeClass} font-semibold`}>Overall Attendance</p>
      </div>
      <div className="mt-2 text-xl font-bold">{overallPercentage}%</div>
      <div className="relative w-full h-6 bg-gray-700 rounded-full overflow-hidden mt-3">
      <motion.div
      className={`absolute top-0 left-0 h-full ${overallPercentage >= 75 ? "bg-green-400" : "bg-amber-400"}`}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={progressVariants}
      ></motion.div>
      </div>
      <div className={`${fontSizeClass} mt-2`}>
      {overallPercentage >= 75 ? (
        <p className="text-green-500 flex items-center">
        <Check size={16} className="mr-1" /> Above required 75%
        </p>
      ) : (
        <p className="text-red-500 flex items-center">
        <X size={16} className="mr-1" /> Need {(75 - overallPercentage).toFixed(1)}% to meet 75%
        </p>
      )}
      </div>
      </motion.div>

      {/* Present Section */}
      <motion.div
      className={`${isDark ? "dark border border-gray-700" : "light border border-gray-200"} h-auto rounded-lg p-5 shadow-sm`}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={cardVariants}
      custom={1}
      >
      <div className="flex items-center">
      <Check className={`${isDark ? "text-green-400" : "text-green-500"} mr-2`} size={18} />
      <p className={`${fontSizeClass} font-semibold`}>Present Days</p>
      </div>
      <div className="mt-3 text-2xl font-bold">{presentDays}</div>
      <p className={`${fontSizeClass} text-gray-400 mt-1`}>out of {totalWorkingDays} working days</p>
      </motion.div>

      {/* Absent Section */}
      <motion.div
      className={`${isDark ? "dark border border-gray-700" : "light border border-gray-200"} h-auto rounded-lg p-5 shadow-sm`}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={cardVariants}
      custom={2}
      >
      <div className="flex items-center">
      <X className={`${isDark ? "text-red-400" : "text-red-500"} mr-2`} size={18} />
      <p className={`${fontSizeClass} font-semibold`}>Absent Days</p>
      </div>
      <div className="mt-3 text-2xl font-bold">{absentDays}</div>
      <p className={`${fontSizeClass} text-gray-400 mt-1`}>out of {totalWorkingDays} working days</p>
      </motion.div>

      {/* Remaining Section */}
      <motion.div
      className={`${isDark ? "dark border border-gray-700" : "light border border-gray-200"} h-auto rounded-lg p-5 shadow-sm`}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={cardVariants}
      custom={3}
      >
      <div className="flex items-center">
      <Calendar className={`${isDark ? "text-blue-400" : "text-blue-500"} mr-2`} size={18} />
      <p className={`${fontSizeClass} font-semibold`}>Remaining Days</p>
      </div>
      <div className="mt-3 text-2xl font-bold">{remainingDays}</div>
      <p className={`${fontSizeClass} text-gray-400 mt-1`}>out of {totalWorkingDays} working days</p>
      </motion.div>
      </div>

      {/* Charts & Risk List */}
      <div className="flex flex-col lg:flex-row gap-5 mt-6 max-w-screen">
      <motion.div
      className={`${isDark ? "dark border border-gray-700" : "light border border-gray-200"} rounded-lg p-5 flex flex-col lg:w-1/2 shadow-sm`}
      initial={{ opacity: 0, y: 30 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      >
      <div className={`${headingFontClass} font-semibold`}>Attendance Trend</div>
      <div className="text-gray-400 text-sm">Your attendance over the last 3 months</div>
      <div className="mt-6 w-full h-64">
      <LineChart />
      </div>
      </motion.div>

      <motion.div
      className={`${isDark ? "dark border border-gray-700" : "light border border-gray-200"} rounded-lg p-5 flex flex-col lg:w-1/2 shadow-sm`}
      initial={{ opacity: 0, y: 30 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      >
      <div className={`${headingFontClass} font-semibold`}>Subjects at Risk</div>
      <div className="text-gray-400 text-sm">Subjects below required attendance</div>
      <div className="mt-4 pt-2">
      <RiskSubjectsList />
      </div>
      </motion.div>
      </div>
      </>
    );
}
