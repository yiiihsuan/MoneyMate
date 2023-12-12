import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];


const processData = (data, key) => {
    const summary = data.reduce((acc, item) => {
        acc[item[key]] = (acc[item[key]] || 0) + item.total;
        return acc;
    }, {});

    return Object.entries(summary).map(([name, value]) => ({ name, value }));
};

const BankPieComponent = ({ data }) => {
    // 根據銀行計算
    const dataByBank = processData(data, 'bank_name');
    // 根據貨幣類型計算
    const dataByType = processData(data, 'type');
    // 計算總金額
    const totalAmount = data.reduce((acc, item) => acc + item.total, 0);

    return (
        <div>
            <h3>帳戶總餘額: {totalAmount}</h3>
            <div className="chartContainer" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <PieChart width={300} height={300}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={dataByBank}
                    cx={150}
                    cy={150}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {dataByBank.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            <PieChart width={300} height={300}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={dataByType}
                    cx={150}
                    cy={150}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {dataByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            </div>
        </div>
    );
};

export default BankPieComponent;
