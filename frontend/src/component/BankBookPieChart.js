import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];


const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Heading = styled.h3`
  margin-bottom: -5px; 
`;

const processData = (data, key) => {
    const summary = data.reduce((acc, item) => {
        acc[item[key]] = (acc[item[key]] || 0) + item.total;
        return acc;
    }, {});

    return Object.entries(summary).map(([name, value]) => ({ name, value }));
};

const BankPieComponent = ({ data }) => {

    const [showAmount, setShowAmount] = useState(false);

    const dataByBank = processData(data, 'bank_name');
    const dataByType = processData(data, 'type');
    const totalAmount = data.reduce((acc, item) => acc + item.total, 0);

    return (
        <div>
            <Heading
                onMouseEnter={() => setShowAmount(true)} //mouse 懸停 顯示
                onMouseLeave={() => setShowAmount(false)} // 移開隱藏
                onClick={() => setShowAmount(!showAmount)} // 點擊切換
            >
                帳戶總餘額: {showAmount ? totalAmount : '*****'}
            </Heading>
            <ChartContainer>
                <PieChart width={300} height={300}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={dataByBank}
                        cx={150}
                        cy={150}
                        outerRadius={80}
                        innerRadius={30}
                        fill="#8884d8"
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
                        innerRadius={30}
                        fill="#8884d8"
                    // label
                    >
                        {dataByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend align="center" verticalAlign="bottom" height={36} />
                </PieChart>
            </ChartContainer>
        </div>
    );
};

export default BankPieComponent;
