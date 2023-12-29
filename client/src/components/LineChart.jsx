import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CustomScatterChart = ({ phaseEnvelope, chemicalComposition }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const addData = (label, newData) => {
    if (chartInstance.current) {
      chartInstance.current.data.labels.push(label);
      chartInstance.current.data.datasets.forEach((dataset) => {
        dataset.data.push(newData);
      });
      chartInstance.current.update();
    }
  };

  useEffect(() => {
    if (phaseEnvelope && chemicalComposition) {
      const bubT = phaseEnvelope.data.bubT || [];
      const dewT = phaseEnvelope.data.dewT || [];
      const bubP = phaseEnvelope.data.bubP || [];
      const dewP = phaseEnvelope.data.dewP || [];

      const scatterChartData = {
        datasets: [
          {
            label: 'Bubble Point',
            data: bubT.map((bubT, index) => ({ x: bubT, y: bubP[index] })),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 1)',
            pointHoverRadius: 10,
            pointRadius: 1,
            hoverRadius: 20,
            showLine: true,
            tension: 0.4
          },
          {
            label: 'Dew Point',
            data: dewT.map((dewT, index) => ({ x: dewT, y: dewP[index] })),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 1)',
            pointRadius: 1,
            pointHoverRadius: 10,
            hoverRadius: 20,
            showLine: true,
            tension: 0.4
          },
        ],
      };

      if (chartRef.current) {
        if (!chartInstance.current) {
          const ctx = chartRef.current.getContext('2d');
          chartInstance.current = new Chart(ctx, {
            type: 'scatter',
            data: scatterChartData,
            options: {
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  title: {
                    display: true,
                    text: 'Temperature [K]',
                    align: 'end',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Pressure [bar]',
                    align: 'end',
                  },
                },
              },
              plugins: {
                tooltip: {
                  mode: 'index',
                  intersect: false,
                },
                legend: {
                  position: 'top',
                },
              },
            },
          });
        } else {
          chartInstance.current.data = scatterChartData;
          chartInstance.current.update();
        }
      }
    }
  }, [phaseEnvelope]);

  return <canvas ref={chartRef} width="400" height="200" />;
};

export default CustomScatterChart;
