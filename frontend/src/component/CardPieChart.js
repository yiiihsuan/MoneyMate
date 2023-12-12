
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// const data = [
//   { card_name: "玉山Ubear卡", amount: 3200 },
//   { card_name: "郵政visa", amount: 5000 },
//   { card_name: "台新gogo卡", amount: 2000 }
// ];


// {"list":
// [{"card_name":"玉山Ubear卡","amount":3200,"is_paid":0},
// {"card_name":"郵政visa","amount":5000,"is_paid":1},
// {"card_name":"台新gogo卡","amount":2000,"is_paid":0}]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const  CardpieChart= ({ data }) =>  (

  <PieChart width={200} height={200}>
    <Pie
      data={data}
      cx={100}
      cy={100}
      labelLine={false}
      label={({ name, percent, card_name }) => `${card_name} (${(percent * 100).toFixed(0)}%)`}
      outerRadius={80}
      fill="#8884d8"
      dataKey="amount"
      nameKey="card_name"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);

export default CardpieChart;

// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

// const CardpieChart = ({ data }) => {

//     console.log('data in cardpie:', data);
  
//   const pieChartData = data.map((card, index) => ({
//     name: card.card_name,
//     value: card.amount,
//     fill: COLORS[index % COLORS.length],
//   }));

//   console.log('piechartdata',pieChartData);

//   return (
//     <PieChart width={200} height={200}>
//       <Pie
//         dataKey="value"
//         isAnimationActive={true}
//         data={pieChartData}
//         cx={100}
//         cy={100}
//         outerRadius={80}
//         fill="#8884d8"
//         label
//       >
//         {pieChartData.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={entry.fill} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend />
//     </PieChart>
//   );
// };

// export default CardpieChart;
