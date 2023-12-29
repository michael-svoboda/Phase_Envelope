import React, { useRef, useEffect } from 'react';
import { Card, Box } from '@mui/material';
import Chart from 'chart.js/auto';

const DoughnutChart = ({data}) => {
  
  const chartRef = useRef(null);

  const colorPalette = {
    'methane': '#75fb91', // Lightest green

    'ethane': '#fabaab', // Medium green
    'propane': '#fc9265', // Darkest green
    'n-butane': '#ff773d', // Lightest orange
    'i-butane': '#ff773d', // Medium orange
    'n-pentane': '#f45405', // Darkest orange
    'i-pentane': '#f45405', // Lightest purple (i-pentane)

    'i-hexane': '#9f77b9', // medium purple (ihexane)
    'n-hexane': '#9f77b9', // Darkest purple (nhexane)

    'CO2': 'rgba(255, 206, 86)', // Chart.js yellow color
    'nitrogen': '#ababab', // Grey color
  };

  useEffect(() => {
    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext('2d');

      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      const labels = Object.keys(data);
      const datasetData = Object.values(data).map((value) => parseFloat(value));
      const backgroundColors = labels.map((label) => colorPalette[label]);

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: datasetData,
              backgroundColor: backgroundColors,
              borderColor: 'white',
              borderWidth: 1.5,
            },
          ],
        },
        options: {
          cutout: '50%',
          plugins: {
            tooltip: {
              enabled: true,
            },
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [data]);

  // Dynamically adjust canvas size to fill its parent container
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = chartRef.current;
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <Card style={{ height: '100%', backgroundColor: 'black' }}>
      <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
        <canvas ref={chartRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
      </Box>
    </Card>
  );
};

export default DoughnutChart;
