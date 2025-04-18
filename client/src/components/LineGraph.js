import React, {useRef, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend,
  TimeScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend,
  TimeScale,
);

export default function LineGraph({ data, selectedTimePeriod }) {

  const chartRef = useRef();

  const chartData = {
    datasets: [
      {
        label: 'Metric',
        data: data.map(item => ({
          // UTC+3
          x: new Date(item.Timestamp).getTime()- 3*60*60*1000,
          y: item.Average,
        })),
        borderColor: 'red',
        tension: 0.4,
      },
    ],
  };
  let xAxisSettings = {
    type: 'time',
    time: {
      tooltipFormat: 'MMM d, yyyy HH:mm:ss',
    },
    title: {
      display: true,
      text: 'Time (UTC)',
    },
  };

  if (selectedTimePeriod === 'Last Week') {
    xAxisSettings.time.unit = 'day';
    xAxisSettings.time.displayFormats = {
      day: 'EEE',
    };
  } else if (selectedTimePeriod === 'Last Month') {

    xAxisSettings.time.unit = 'day';
    xAxisSettings.time.displayFormats = {
      day: 'MMM d',
    };
  } else {

    xAxisSettings.time.unit = 'hour';
    xAxisSettings.time.displayFormats = {
      hour: 'h a',
    };
  }
  const options = {
    responsive: true,
    scales: {
      x: xAxisSettings,
      y: {
        title: {
          display: true,
          text: 'Percent',
        },
        ticks: {
          callback: (value) => value.toFixed(5),
        },
      },
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy?.();
      }
    };
  }, []);

  return <Line ref={chartRef} data={chartData} options={options} />;
};
