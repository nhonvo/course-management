import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

interface DataPoint {
    date: string;
    cumulativeBalance: number;
}

interface Props {
    data: DataPoint[];
}

const CumulativeBalanceLineChart: React.FC<Props> = ({ data }) => {
    return (
        <div className="w-full h-[400px]">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">
                Cumulative Balance Over Time
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `VND ${value.toLocaleString()}`} />
                    <Tooltip formatter={(value) => `VND ${value.toLocaleString()}`} />
                    <Line
                        type="monotone"
                        dataKey="cumulativeBalance"
                        stroke="rgba(0, 123, 255, 0.8)"
                        strokeWidth={2}
                        dot={{ r: 4, fill: 'rgba(0, 123, 255, 0.8)' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CumulativeBalanceLineChart;
