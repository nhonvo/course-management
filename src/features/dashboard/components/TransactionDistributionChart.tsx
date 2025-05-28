import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Transaction } from 'src/models/Transaction';

// Props type
interface TransactionDistributionChartProps {
    transactions: Transaction[];
}

// Custom blue color palette
const COLORS = [
    '#1E90FF', '#00BFFF', '#87CEFA', '#4682B4',
    '#5F9EA0', '#6495ED', '#4169E1', '#B0C4DE',
];

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md p-2 border rounded text-sm text-gray-700">
                <p><strong>{payload[0].name}</strong></p>
                <p>Số tiền: {payload[0].value.toLocaleString()} VND</p>
            </div>
        );
    }
    return null;
};

const TransactionDistributionChart: React.FC<TransactionDistributionChartProps> = ({
    transactions,
}) => {
    // Group by counter_account and sum the debit
    const dataMap = new Map<string, number>();

    transactions.forEach(({ counter_account, debit }) => {
        dataMap.set(counter_account, (dataMap.get(counter_account) || 0) + debit);
    });

    const total = Array.from(dataMap.values()).reduce((acc, val) => acc + val, 0);

    const chartData = Array.from(dataMap.entries()).map(([counter_account, debit]) => ({
        name: counter_account,
        value: debit,
        percent: debit / total,
    }));

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2 className="text-lg font-semibold mb-2 text-blue-600">
                Phân bổ chi tiêu theo loại giao dịch
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label={({ name, percent }) =>
                            percent > 0.05 ? `${name}: ${(percent * 100).toFixed(1)}%` : ''
                        }
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        wrapperStyle={{
                            fontSize: '12px',
                            maxHeight: '200px', // Adjust height as needed
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            paddingRight: '8px', // Space for scrollbar
                        }}
                    />

                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionDistributionChart;
