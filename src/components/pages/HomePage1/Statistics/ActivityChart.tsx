import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from 'chart.js';
import "./Statistics.scss";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler);

const ActivityChart = () => {
  const data = {
    labels: ['JAN', 'FEB', 'MAR'],
    datasets: [
      {
        label: '',
        data: [500, 1952.8, 1000], // Example data
        fill: true,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#007bff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointHoverRadius: 6,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1d1f21',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        displayColors: false,
        callbacks: {
          label: function (context : any) {
            return `$${context.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ActivityChart;
