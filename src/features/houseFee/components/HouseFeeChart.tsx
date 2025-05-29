import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyHouseFee } from 'src/features/houseFee/service/houseFeeService';


type Props = {
    data: MonthlyHouseFee[];
};

const HouseFeeChart: React.FC<Props> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => value.toLocaleString()} />
                <Tooltip formatter={(value: number) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} />
                <Legend />
                <Bar dataKey="amount" fill="#1f77b4" name="House Fee" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default HouseFeeChart;
