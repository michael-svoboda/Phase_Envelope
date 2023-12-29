import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const DarkModeRadarChart = ({ chemicalComposition }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (chartRef && chartRef.current && chemicalComposition) {
      const ctx = chartRef.current.getContext('2d');

      const labels = Object.keys(chemicalComposition);

      const datasets = [
        {
          label: 'Chemical Composition',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          data: labels.map((label) => chemicalComposition[label]),
        },
      ];

      const config = {
        type: 'radar',
        data: {
          labels,
          datasets,
        },
        options: {
          plugins: {
            beforeDraw: (chart) => {
              const ctx = chart.ctx;
              ctx.fillStyle = 'black';
              ctx.fillRect(0, 0, chart.canvas.width, chart.canvas.height);
            },
            legend: {
              display: false,
            },
          },
          scales: {
            r: {
              min: 0,
              max: 100,
              angleLines: {
                color: 'white',
                display: true,
                lineWidth: 0.1,
                borderDash: [5, 5],
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
                stepSize: 10, // Optionally set the step size
                min: 0,
                max: 100,
                display: true,
                circular: true,
              },
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                color: 'white',
                showLabelBackdrop: false,
                display: false,
              },
              pointLabels: {
                color: 'white',
              },
            },
          },
          elements: {
            point: {
              borderWidth: 1,
              borderColor: 'white',
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      };

      const chart = new Chart(ctx, config);
      chartInstanceRef.current = chart;
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chemicalComposition]);

  return <canvas ref={chartRef} />;
};

export default DarkModeRadarChart;
