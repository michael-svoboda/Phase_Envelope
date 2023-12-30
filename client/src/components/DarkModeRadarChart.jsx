import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const DarkModeRadarChart = ({ chemicalComposition, phaseFractions }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (chartRef && chartRef.current && chemicalComposition) {
      const ctx = chartRef.current.getContext('2d');
      console.log(phaseFractions)

      const labels = Object.keys(chemicalComposition);
      const dataValues = Object.values(chemicalComposition);

      const labels2 = Object.keys(phaseFractions.data);
      const dataValues2 = Object.values(phaseFractions);
      console.log('LABELS')
      console.log(labels2)

      const liquidFractions = [];
      const vaporFractions = [];

      for (const label of labels2) {
        console.log(typeof(phaseFractions.data[label]['l']))
        const mols = phaseFractions.data[label]['v'] + phaseFractions.data[label]['l']
        liquidFractions.push(phaseFractions.data[label]['l']/mols);
        vaporFractions.push(phaseFractions.data[label]['v']/mols);
      }
      console.log('DATAVALUES')
      console.log(dataValues)

      console.log('LIQUIDFRACS')
      console.log(liquidFractions)

      console.log('VAPOR FRACS')
      console.log(vaporFractions)

      const datasets2 = [
        {
          label: 'Liquid Fractions',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          data: liquidFractions,
        },
        {
          label: 'Vapor Fractions',
          backgroundColor: 'rgba(132, 99, 255, 0.2)',
          borderColor: 'rgb(132, 99, 255)',
          pointBackgroundColor: 'rgb(132, 99, 255)',
          data: vaporFractions,
        },
      ];



      const datasets = [
        { 
          label: 'Vapor Fractions',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          data: vaporFractions,
        },
        {
          label: 'Liquid Fractions',
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // React default blue theme
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          data: liquidFractions,
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
              max: 1,
              angleLines: {
                color: 'white',
                display: true,
                lineWidth: 0.1,
                borderDash: [5, 5],
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
                stepSize: 0.1, // Optionally set the step size
                min: 0,
                max: 1,
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
  }, [phaseFractions, chemicalComposition]);

  return <canvas ref={chartRef} />;
};

export default DarkModeRadarChart;
