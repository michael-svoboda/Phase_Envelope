import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const RadarChart = ({ ChemicalComposition }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    updateChartData();
  }, [ChemicalComposition]);

  const updateChartData = () => {
    const chartData = Object.keys(ChemicalComposition).map((key) => ({
      type: 'scatterpolar',
      r: Array.from({ length: 6 }, () => Math.floor(Math.random() * 5) + 1),
      theta: ['A', 'B', 'C', 'D', 'E', 'A'],
      fill: 'toself',
      showlegend: false,
      opacity: 1,
      marker: { color: getRandomColor() },
    }));
    setData(chartData);
  };

  const getRandomColor = () => {
    // Implement your logic to generate random colors here
    // Example: return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return '#000000';
  };

  const layout = {
    polar: {
      bgcolor: 'black',
      radialaxis: {
        visible: true,
        range: [0, 5],
        gridcolor: 'rgba(255, 255, 255, 0.5)',
        tickfont: { color: 'white' },
      },
      angularaxis: {
        tickfont: { color: 'white' },
      },
    },
    autosize: true,
    paper_bgcolor: 'black',
    showlegend: false,
    width: 350,
    height: 350,
    margin: { t: 10, b: 20, l: 10, r: 10 }, // Adjust margins for padding
    yaxis: {
      automargin: true,
    },
    xaxis: {
      automargin: true,
    },
  };

  return (
    <Plot
      data={data}
      layout={layout}
      config={{ responsive: true }}
    />
  );
};

export default RadarChart;
