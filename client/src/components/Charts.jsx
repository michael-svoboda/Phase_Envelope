import React, { useRef, useEffect } from 'react';
import { Card, Box } from '@mui/material';
import Chart from 'chart.js/auto';

const DoughnutChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy existing chart if it exists
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
          cutout: '50%',
          plugins: {
            tooltip: {
              enabled: false,
            },
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <Card style={{ height: '100%', backgroundColor: 'white' }}>
      <Box sx={{ height: '300px', width: '300px' }}>
        <canvas ref={chartRef} />
      </Box>
    </Card>
  );
};

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy existing chart if it exists
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          // Add desired options
        },
      });
    }
  }, [data]);

  return (
    <Card style={{ height: '100%', backgroundColor: 'white' }}>
      <Box sx={{ height: '300px', width: '300px' }}>
        <canvas ref={chartRef} />
      </Box>
    </Card>
  );
};

const RadarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy existing chart if it exists
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
          // Add desired options
        },
      });
    }
  }, [data]);

  return (
    <Card style={{ height: '100%', backgroundColor: 'white' }}>
      <Box sx={{ height: '300px', width: '300px' }}>
        <canvas ref={chartRef} />
      </Box>
    </Card>
  );
};

export { DoughnutChart, LineChart, RadarChart };
