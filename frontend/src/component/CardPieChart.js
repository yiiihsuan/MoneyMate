import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const CardpieChart = ({ data }) => {
  
  const pieChartData = data.map((card, index) => ({
    name: card.card_name,
    value: card.amount,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <PieChart width={200} height={200}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={pieChartData}
        cx={100}
        cy={100}
        outerRadius={80}
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

export default CardpieChart;
