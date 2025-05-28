import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { Transaction } from 'src/models/Transaction';


interface Props {
    data: Transaction[];
}
const BLUE_COLORS = [
    '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8',
    '#93c5fd', '#bfdbfe', '#1e40af', '#1e3a8a',
];

const DetailedTransactionAnalysis: React.FC<Props> = ({ data }) => {
    // Step 1: Aggregate data to Recharts format
    // Output shape: [{ transaction_date: '2025-05-01', Food: 2000, Transport: 1500, ... }, ...]
    const categories = Array.from(new Set(data.map(d => d.category)));

    // Create a map: {date -> {category -> sum of debit, counter_account}}
    const aggregatedMap = new Map<string, Record<string, number | string>>();

    data.forEach(({ transaction_date, category, debit }) => {
        if (!aggregatedMap.has(transaction_date)) {
            aggregatedMap.set(transaction_date, { transaction_date });
        }
        const record = aggregatedMap.get(transaction_date)!;

        record[category] = (record[category] || 0) as number + debit;
    });

    const aggregatedData = Array.from(aggregatedMap.values());
    const colorMap = categories.reduce<Record<string, string>>((acc, category, i) => {
        acc[category] = BLUE_COLORS[i % BLUE_COLORS.length];
        return acc;
    }, {});

    // Custom tooltip to show category, date, expense
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: 10 }}>
                    <p><strong>Date:</strong> {label}</p>
                    {payload.map((entry: any) => (
                        <p key={entry.dataKey} style={{ color: entry.color }}>
                            <strong>{entry.dataKey}:</strong> VND {entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <BarChart data={aggregatedData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 200, 200, 0.3)" />
                    <XAxis
                        dataKey="transaction_date"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        tick={{ fill: '#4a4a4a' }}
                        tickLine={false}
                        axisLine={{ stroke: '#BBBBBB', strokeWidth: 1.2 }}
                        interval={0}
                    />
                    <YAxis
                        tickFormatter={(value) => `VND ${value.toLocaleString()}`}
                        tick={{ fill: '#4a4a4a' }}
                        axisLine={{ stroke: '#BBBBBB', strokeWidth: 1.2 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} />
                    {categories.map(category => (
                        <Bar
                            key={category}
                            dataKey={category}
                            stackId="a"
                            fill={colorMap[category]}
                            stroke="rgba(0,0,0,0.5)"
                            strokeWidth={0.5}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DetailedTransactionAnalysis;
