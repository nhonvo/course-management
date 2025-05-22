'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { currencyFormat } from 'src/lib/utilities';

type Transaction = {
    transaction_date: string;
    debit: number;
    credit: number;
};

type Props = {
    transactions: Transaction[];
};
export default function MonthlyIncomeExpenseChart({ transactions }: Props) {

    // Group by month
    const dataMap = new Map<string, { income: number; expense: number }>();

    transactions.forEach(({ transaction_date, debit, credit }) => {
        const month = new Date(transaction_date).toISOString().slice(0, 7); // "YYYY-MM"
        const prev = dataMap.get(month) || { income: 0, expense: 0 };
        
        dataMap.set(month, {
            income: prev.income + credit,
            expense: prev.expense + debit,
        });
    });

    const chartData = Array.from(dataMap.entries()).map(([month, { income, expense }]) => ({
        month,
        income,
        expense,
    }));

    return (
        <div className="w-full h-[400px] bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Monthly Income & Expenses</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => currencyFormat(value)} />
                    <Legend />
                    <Bar dataKey="income" fill="#10b981" name="Income" />
                    <Bar dataKey="expense" fill="#ef4444" name="Expenses" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
