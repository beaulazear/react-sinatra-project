import React from 'react';

function BarChart({ data }) {
  const maxValue = Math.max(...data);

  return (
    <div className="bar-chart">
      {data.map((number, index) => (
        <div
          key={index}
          className="bar"
          style={{ height: `${(number / maxValue) * 100}%` }}
        >
          {number}
        </div>
      ))}
    </div>
  );
}

export default BarChart;
