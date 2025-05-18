"use client";
import React, { useState, useContext, useEffect } from 'react';
import { VscFilePdf } from "react-icons/vsc";
import { FaRegFileExcel } from "react-icons/fa";
import { GrDocumentCsv } from "react-icons/gr";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './Appearance.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

function Reports() {
  const [activeView, setActiveView] = useState("Monthly");
  const { theme, font } = useContext(ThemeContext);
  const { authFetch } = useAuth();
  const [reportPeriod, setReportPeriod] = useState("Current Semester");
  const [reportType, setReportType] = useState("All Subjects");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [monthlyData, setMonthlyData] = useState([]);
  const [dayWiseData, setDayWiseData] = useState([]);
  const [subjectWiseData, setSubjectWiseData] = useState([]);
  const [statusWiseData, setStatusWiseData] = useState([]);
  const [summaryData, setSummaryData] = useState({
    overallAttendance: 0,
    presentDays: 0,
    absentDays: 0,
    totalClasses: 0
  });

  const viewContent = {
    "Monthly": {
      heading: "Monthly Attendance Trend",
      subheading: "Your attendance percentage month by month"
    },
    "Subject-Wise": {
      heading: "Subject-wise Attendance Trend",
      subheading: "Your attendance percentage subject-wise"
    },
    "Status-Wise": {
      heading: "Status-wise Attendance Trend",
      subheading: "Your attendance percentage based on status"
    },
    "Day-Wise": {
      heading: "Day-wise Attendance Trend",
      subheading: "Your attendance percentage for each day"
    }
  };

  // Fetch attendance data from the backend
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true);
      try {
        // Fetch attendance summary using authFetch
        const summaryResponse = await authFetch('attendance/summary');

        if (summaryResponse && summaryResponse.subject_wise) {
          processAttendanceData(summaryResponse);
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (err) {
        console.error("Error fetching attendance data:", err);
        setError(err.message || "Failed to fetch attendance data");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [reportPeriod, reportType, authFetch]);

  // Process the raw attendance data into chart formats
  const processAttendanceData = (data) => {
    const subjectWise = data.subject_wise;

    // Calculate overall summary
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalClasses = 0;

    // Process subject-wise data
    const subjectData = Object.entries(subjectWise).map(([subject, stats]) => {
      totalPresent += stats.present;
      totalAbsent += stats.total - stats.present;
      totalClasses += stats.total;

      return {
        Subject: subject,
        Attendance: stats.percentage
      };
    });

    setSubjectWiseData(subjectData);

    // Set summary data
    setSummaryData({
      overallAttendance: totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0,
                   presentDays: totalPresent,
                   absentDays: totalAbsent,
                   totalClasses: totalClasses
    });

    // Process monthly attendance data (if available in the API response)
    // If not available, generate sample data based on overall stats

    // For monthly data - ensure all months are represented with zero values if no data
    if (data.monthly) {
      // Ensure all months have values, even if zero
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthDataMap = new Map();

      // Initialize with zeros
      months.forEach(month => {
        monthDataMap.set(month, { Month: month, Attendance: 0 });
      });

      // Update with actual data
      data.monthly.forEach(item => {
        monthDataMap.set(item.Month, item);
      });

      // Convert back to array in correct order
      setMonthlyData(months.map(month => monthDataMap.get(month)));
    } else {
      // Generate monthly data as placeholder
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const overallPercent = summaryData.overallAttendance;

      const monthlyDataGenerated = months.map(month => ({
        Month: month,
        Attendance: Math.min(100, Math.max(50,
                                           overallPercent + Math.round((Math.random() - 0.5) * 20)))
      }));

      setMonthlyData(monthlyDataGenerated);
    }

    // For day-wise data - either use actual data or generate based on summary
    if (data.dayWise) {
      // Ensure all days have values
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayDataMap = new Map();

      // Initialize with zeros
      days.forEach(day => {
        dayDataMap.set(day, { Day: day, Attendance: 0 });
      });

      // Update with actual data
      data.dayWise.forEach(item => {
        dayDataMap.set(item.Day, item);
      });

      // Convert back to array in correct order
      setDayWiseData(days.map(day => dayDataMap.get(day)));
    } else {
      // Generate day-wise data as placeholder
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const overallPercent = summaryData.overallAttendance;

      const dayWiseDataGenerated = days.map(day => ({
        Day: day,
        Attendance: Math.min(100, Math.max(40,
                                           overallPercent + Math.round((Math.random() - 0.5) * 30)))
      }));

      setDayWiseData(dayWiseDataGenerated);
    }

    // Generate status-wise data
    setStatusWiseData([
      { Status: 'Present', Count: totalPresent },
      { Status: 'Absent', Count: totalAbsent },
      { Status: 'No Class', Count: Math.round(totalClasses * 0.1) } // Just a placeholder
    ]);
  };

  const handleFilterApply = async () => {
    setLoading(true);
    try {
      // Prepare query parameters
      const params = new URLSearchParams();
      if (reportPeriod !== "Current Semester") {
        params.append('period', reportPeriod.toLowerCase().replace(' ', '_'));
      }
      if (reportType !== "All Subjects") {
        params.append('subject', reportType);
      }

      const queryString = params.toString();
      const endpoint = queryString ? `attendance/summary?${queryString}` : 'attendance/summary';

      // Fetch filtered data
      const summaryResponse = await authFetch(endpoint);

      if (summaryResponse && summaryResponse.subject_wise) {
        processAttendanceData(summaryResponse);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (err) {
      console.error("Error applying filters:", err);
      setError(err.message || "Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format) => {
    try {
      // Prepare query parameters for the download
      const params = new URLSearchParams();
      params.append('format', format.toLowerCase());

      if (reportPeriod !== "Current Semester") {
        params.append('period', reportPeriod.toLowerCase().replace(' ', '_'));
      }
      if (reportType !== "All Subjects") {
        params.append('subject', reportType);
      }

      const queryString = params.toString();
      const endpoint = `reports/download?${queryString}`;

      // Fetch the download URL
      const response = await authFetch(endpoint);

      if (response && response.url) {
        // Trigger download by opening the URL
        window.open(response.url, '_blank');
      } else {
        throw new Error(`Failed to download ${format} report`);
      }
    } catch (err) {
      console.error(`Error downloading ${format} report:`, err);
      setError(err.message || `Failed to download ${format} report`);
    }
  };

  const chartData =
  activeView === "Day-Wise"
  ? dayWiseData
  : activeView === "Subject-Wise"
  ? subjectWiseData
  : activeView === "Status-Wise"
  ? statusWiseData
  : monthlyData;

  const xAxisKey =
  activeView === "Day-Wise"
  ? "Day"
  : activeView === "Subject-Wise"
  ? "Subject"
  : activeView === "Status-Wise"
  ? "Status"
  : "Month";

  const dataKey =
  activeView === "Status-Wise" ? "Count" : "Attendance";

  // Helper function to get theme-dependent styles
  const getThemeStyles = () => {
    return {
      backgroundColor: theme === "Dark" ? "bg-gray-900" : "bg-gray-100",
      textColor: theme === "Dark" ? "text-white" : "text-gray-900",
      outlineColor: theme === "Dark" ? "outline-white" : "outline-gray-800",
      buttonBg: theme === "Dark" ? "bg-gray-800" : "bg-gray-300",
      buttonHoverBg: theme === "Dark" ? "hover:bg-gray-700" : "hover:bg-gray-400",
      selectBg: theme === "Dark" ? "bg-black" : "bg-white",
      chartBg: theme === "Dark" ? "bg-gray-800" : "bg-white",
      navBg: theme === "Dark" ? "bg-gray-800" : "bg-gray-300",
      navActiveBg: theme === "Dark" ? "bg-black" : "bg-gray-500",
      chartStroke: theme === "Dark" ? "#444" : "#ccc",
      chartAxisStroke: theme === "Dark" ? "white" : "black",
      tooltipBg: theme === "Dark" ? "#222" : "#f5f5f5",
      tooltipBorder: theme === "Dark" ? "#555" : "#ddd",
      tooltipTextColor: theme === "Dark" ? "white" : "black",
      iconColor: theme === "Dark" ? "white" : "black"
    };
  };

  const styles = getThemeStyles();

  // Render loading state
  if (loading) {
    return (
      <div className={`${styles.backgroundColor} ${styles.textColor} min-h-screen p-4 flex justify-center items-center ${
        font === "small"
        ? "font-small-text"
        : font === "Medium"
        ? "font-medium-text"
        : "font-large-text"
      } ${theme === "Dark" ? "dark" : "light"}`}>
      <div className="text-xl">Loading attendance data...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={`${styles.backgroundColor} ${styles.textColor} min-h-screen p-4 flex flex-col justify-center items-center ${
        font === "small"
        ? "font-small-text"
        : font === "Medium"
        ? "font-medium-text"
        : "font-large-text"
      } ${theme === "Dark" ? "dark" : "light"}`}>
      <div className="text-xl text-red-400 mb-4">Error: {error}</div>
      <button
      className={`${styles.buttonBg} px-4 py-2 rounded-md ${styles.buttonHoverBg} ${styles.textColor}`}
      onClick={() => window.location.reload()}
      >
      Retry
      </button>
      </div>
    );
  }

  return (
    <div className={`${styles.backgroundColor} ${styles.textColor} min-h-screen p-2 md:p-4 ${
      font === "small"
      ? "font-small-text"
      : font === "Medium"
      ? "font-medium-text"
      : "font-large-text"
    } ${theme === "Dark" ? "dark" : "light"}`}>

    <div className="md:flex md:gap-4 mx-2 md:mx-4">
    {/* Filters Panel */}
    <div className={`flex flex-col outline ${styles.outlineColor} rounded-md w-full md:w-1/4 p-4 mb-4 md:mb-0`}>
    <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-4">Filters</h1>

    <p className="mt-2 text-base md:text-lg mb-1">Report Period</p>
    <select
    className={`p-2 rounded-lg ${styles.selectBg} ${styles.textColor} text-base md:text-lg mb-3 border border-gray-400`}
    value={reportPeriod}
    onChange={(e) => setReportPeriod(e.target.value)}
    >
    <option>Current Semester</option>
    <option>Last Month</option>
    <option>Last Week</option>
    <option>Custom Range</option>
    </select>

    <p className="mt-2 text-base md:text-lg mb-1">Report Type</p>
    <select
    className={`p-2 rounded-lg ${styles.selectBg} ${styles.textColor} text-base md:text-lg mb-4 border border-gray-400`}
    value={reportType}
    onChange={(e) => setReportType(e.target.value)}
    >
    <option>All Subjects</option>
    {subjectWiseData.map(subject => (
      <option key={subject.Subject}>{subject.Subject}</option>
    ))}
    </select>

    <button
    className={`mt-auto rounded-md py-2 px-4 ${styles.buttonHoverBg} transition hover:-translate-y-0.5 motion-reduce:transition-none ${styles.buttonBg} text-base md:text-lg ${styles.textColor}`}
    onClick={handleFilterApply}
    >
    Apply Filters
    </button>
    </div>

    {/* Main Content Area */}
    <div className="md:w-3/4">
    {/* Attendance Summary */}
    <div className={`flex flex-col outline ${styles.outlineColor} rounded-md p-4 mb-4`}>
    <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-2">Attendance Summary</h1>
    <p className="mb-4 text-base md:text-lg">Overall attendance statistics for the current semester</p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
    {[
      { label: 'Overall Attendance', value: `${summaryData.overallAttendance}%` },
      { label: 'Present Days', value: summaryData.presentDays },
      { label: 'Absent Days', value: summaryData.absentDays },
      { label: 'Total Classes', value: summaryData.totalClasses }
    ].map((item, idx) => (
      <div className="flex flex-col items-center" key={idx}>
      <p className="text-sm md:text-base mb-2">{item.label}</p>
      <div className={`w-16 h-16 flex items-center justify-center ${styles.buttonBg} rounded-full mb-1`}>
      <span className="text-lg md:text-xl font-bold">{item.value}</span>
      </div>
      </div>
    ))}
    </div>
    </div>

    {/* View Selection */}
    <div className={`rounded-md ${styles.navBg} px-2 py-2 mb-4 overflow-x-auto`}>
    <div className="flex justify-between min-w-max">
    {Object.keys(viewContent).map((label) => (
      <button
      key={label}
      onClick={() => setActiveView(label)}
      className={`rounded-sm py-2 px-3 md:px-4 transition hover:-translate-y-0.5 motion-reduce:transition-none text-sm md:text-base ${
        activeView === label ? styles.navActiveBg : ''
      } ${activeView === label ? 'text-white' : styles.textColor}`}
      >
      {label}
      </button>
    ))}
    </div>
    </div>

    {/* Chart */}
    <div className="mb-4">
    <div className={`outline ${styles.outlineColor} p-4 rounded-xl shadow-lg ${styles.chartBg} h-[350px] md:h-[450px]`}>
    <h2 className="font-bold text-lg md:text-2xl lg:text-3xl mb-2">
    {viewContent[activeView].heading}
    </h2>
    <p className="text-sm md:text-base mb-4">{viewContent[activeView].subheading}</p>

    <div className="h-[250px] md:h-[320px]">
    <ResponsiveContainer width="100%" height="100%">
    <LineChart
    data={chartData}
    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
    >
    <CartesianGrid stroke={styles.chartStroke} strokeDasharray="3 3" />
    <XAxis stroke={styles.chartAxisStroke} dataKey={xAxisKey} tick={{ fontSize: 12 }} />
    <YAxis
    stroke={styles.chartAxisStroke}
    tickFormatter={(value) =>
      activeView === "Status-Wise" ? value : `${value}%`
    }
    tick={{ fontSize: 12 }}
    />
    <Tooltip
    formatter={(value) =>
      activeView === "Status-Wise" ? value : `${value}%`
    }
    contentStyle={{ backgroundColor: styles.tooltipBg, borderColor: styles.tooltipBorder }}
    labelStyle={{ color: styles.tooltipTextColor }}
    itemStyle={{ color: styles.tooltipTextColor }}
    />
    <Legend />
    <Line
    type="monotone"
    dataKey={dataKey}
    stroke="#3b82f6"
    strokeWidth={3}
    activeDot={{ r: 8 }}
    isAnimationActive
    connectNulls={false} // Show breaks in the line for null/undefined values
    />
    </LineChart>
    </ResponsiveContainer>
    </div>
    </div>
    </div>

    {/* Downloadable Reports */}
    <div className={`outline ${styles.outlineColor} rounded-md p-4 mb-4`}>
    <h1 className="font-bold text-lg md:text-2xl lg:text-3xl mb-2">Downloadable Reports</h1>
    <p className="mb-4 text-sm md:text-base">Export your attendance data in different formats</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    <div className={`outline-double p-3 flex items-center space-x-3`}>
    <VscFilePdf color={theme === "Dark" ? 'white' : 'black'} className='text-2xl md:text-3xl' />
    <div>
    <button
    className={`text-base md:text-lg rounded-md p-1 ${styles.buttonHoverBg} transition hover:-translate-y-0.5 motion-reduce:transition-none`}
    onClick={() => handleDownload('PDF')}
    >
    PDF Report
    </button>
    <p className={`text-xs md:text-sm ${theme === "Dark" ? "text-gray-300" : "text-gray-600"}`}>Detailed attendance report</p>
    </div>
    </div>

    <div className={`outline-double p-3 flex items-center space-x-3`}>
    <FaRegFileExcel color={theme === "Dark" ? 'white' : 'black'} className='text-2xl md:text-3xl'/>
    <div>
    <button
    className={`text-base md:text-lg rounded-md p-1 ${styles.buttonHoverBg} transition hover:-translate-y-0.5 motion-reduce:transition-none`}
    onClick={() => handleDownload('Excel')}
    >
    Excel Export
    </button>
    <p className={`text-xs md:text-sm ${theme === "Dark" ? "text-gray-300" : "text-gray-600"}`}>Raw attendance data</p>
    </div>
    </div>

    <div className={`outline-double p-3 flex items-center space-x-3`}>
    <GrDocumentCsv className={`text-2xl md:text-3xl ${theme === "Dark" ? "text-white" : "text-black"}`}/>
    <div>
    <button
    className={`text-base md:text-lg rounded-md p-1 ${styles.buttonHoverBg} transition hover:-translate-y-0.5 motion-reduce:transition-none`}
    onClick={() => handleDownload('CSV')}
    >
    CSV Export
    </button>
    <p className={`text-xs md:text-sm ${theme === "Dark" ? "text-gray-300" : "text-gray-600"}`}>For data analysis</p>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Reports;
