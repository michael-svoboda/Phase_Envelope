import React from 'react';
import Plot from 'react-plotly.js';

const RadarChart = () => {
  const data = [
    {
      type: 'scatterpolar',
      r: [1, 2, 3, 4, 5, 1],
      theta: ['A', 'B', 'C', 'D', 'E', 'A'],
      fill: 'toself',
      showlegend: false,
      opacity: 1,
      marker: {color: '#36A2EB' }
    },
    {
      type: 'scatterpolar',
      r: [3, 2, 5, 1, 4, 3],
      theta: ['A', 'B', 'C', 'D', 'E', 'A'],
      fill: 'toself',
      showlegend: false,
      opacity: 1,
      marker: {color: '#FF6384'}
    },
  ];

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
        automargin: true
      },
      xaxis: {
        automargin: true
      }
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
