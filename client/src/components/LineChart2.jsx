import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const LineChart = ({ phaseEnvelope }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && phaseEnvelope) {
      const bubP = phaseEnvelope.data.bubP || [];
      const dewP = phaseEnvelope.data.dewP || [];
      const bubT = phaseEnvelope.data.bubT || [];
      const dewT = phaseEnvelope.data.dewT || [];

      const trace1 = {
        x: bubT,
        y: bubP,
        mode: 'lines',
        type: 'scatter',
        name: 'Bubble Point',
        line: {
          color: 'rgb(255, 99, 132)',
          width: 1,
        },
      };

      const trace2 = {
        x: dewT,
        y: dewP,
        mode: 'lines',
        type: 'scatter',
        name: 'Dew Point',
        line: {
          color: 'rgb(54, 162, 235)',
          width: 1,
        },
      };

      const data = [trace1, trace2];

      const layout = {
        xaxis: {
          title: 'X Axis Label',
        },
        yaxis: {
          title: 'Y Axis Label',
        },
      };

      Plotly.newPlot(chartRef.current, data, layout);

      return () => {
        Plotly.purge(chartRef.current);
      };
    }
  }, [phaseEnvelope]);

  return <div ref={chartRef}></div>;
};

export default LineChart;
