'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { currencyFormat } from 'src/lib/utilities';

interface ChartData {
    transaction_date: string;
    balance: number;
}

export default function BalanceLineChart({ data }: { data: ChartData[] }) {
    return (
        <section className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Balance Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="transaction_date" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => currencyFormat(value)} />
                    <Line type="monotone" dataKey="balance" stroke="#3b82f6" />
                </LineChart>
            </ResponsiveContainer>
        </section>
    );
}
