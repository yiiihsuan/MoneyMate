import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // 自定义颜色

const PieChartComponent = ({ data }) => {
  const pieChartData = data.map((entry, index) => ({
    ...entry,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <PieChart width={300} height={300}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={pieChartData}
        cx={150}
        cy={150}
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
