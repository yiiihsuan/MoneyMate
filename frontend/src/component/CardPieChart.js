import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const CardPieChart = ({ data }) => {
  if (!Array.isArray(data)) {
    return <div>Invalid data</div>;
  }

  return (
    <div>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          outerRadius={80}
          innerRadius={30}
          fill="#8884d8"
          dataKey="amount"
          nameKey="card_name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: -30 }}>
        {data.map((entry, index) => (
          <div key={`label-${index}`} style={{ color: COLORS[index % COLORS.length], margin: '0 10px', textAlign: 'center' }}>
            <div style={{ width: 10, height: 10, backgroundColor: COLORS[index % COLORS.length], display: 'inline-block' }}></div>
            <span style={{ marginLeft: 5 }}>{`${entry.card_name} (${((entry.amount / data.reduce((acc, cur) => acc + cur.amount, 0)) * 100).toFixed(0)}%)`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPieChart;


