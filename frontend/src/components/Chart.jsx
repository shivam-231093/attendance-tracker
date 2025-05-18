import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function LineChart() {
  const { currentUser, authFetch } = useAuth();
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        const res = await authFetch("/attendance/summary");
        const subjectWise = res.subject_wise;

        const labels = Object.keys(subjectWise);
        const dataPoints = labels.map(subject => subjectWise[subject].percentage);

        const data = {
          labels: labels,
          datasets: [
            {
              label: 'Attendance %',
              data: dataPoints,
              borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            tension: 0.4, // Smooth curve
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75,192,192,1)',
            pointBorderColor: '#fff',
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            },
          ],
        };

        setChartData(data);
        setTimeout(() => setIsLoading(false), 300); // Small delay for animation effect
      } catch (err) {
        console.error("Error fetching attendance summary:", err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser, authFetch]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000, // Chart animation duration
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        cornerRadius: 4,
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
        },
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <motion.div
    className="w-full h-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: isLoading ? 0 : 1 }}
    transition={{ duration: 0.8 }}
    >
    {!chartData ? (
      <div className="h-full w-full flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading chart data...</div>
      </div>
    ) : (
      <Line data={chartData} options={options} />
    )}
    </motion.div>
  );
}
