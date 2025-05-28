'use client';

import { Card, CardContent } from '@/components/ui/card';

interface SummaryCardsProps {
    totalDebit: number;
    totalCredit: number;
    netChange: number;
    currentBalance: number;
    income: number;
    expense: number;
    saving: number;
    total: number;
    balance: number;
    totalSaving: number;
    invest: number;
    transactions: number;
}

interface SummaryCardItemProps {
    label: string;
    value: number;
    color?: string;
}

function SummaryCardItem({ label, value, color = 'text-gray-700' }: SummaryCardItemProps) {
    const format = (num: number) => num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return (
        <Card>
            <CardContent className="p-4">
                <p className="text-sm text-gray-500">{label}</p>
                <p className={`text-xl font-bold ${color}`}>{format(value)}</p>
            </CardContent>
        </Card>
    );
}

export default function SummaryCards(props: SummaryCardsProps) {
    const {
        totalDebit,
        totalCredit,
        netChange,
        currentBalance,
        income,
        expense,
        saving,
        total,
        balance,
        totalSaving,
        invest,
        transactions,
    } = props;

    const items: SummaryCardItemProps[] = [
        { label: 'Total Debit', value: totalDebit, color: 'text-red-600' },
        { label: 'Total Credit', value: totalCredit, color: 'text-green-600' },
        { label: 'Net Change', value: netChange, color: netChange >= 0 ? 'text-green-600' : 'text-red-600' },
        { label: 'Current Balance', value: currentBalance, color: 'text-blue-600' },
        { label: 'Income', value: income, color: 'text-green-600' },
        { label: 'Saving', value: saving, color: 'text-blue-600' },
        { label: 'Total assets', value: total, color: 'text-green-600' },
        { label: 'Expense', value: expense, color: 'text-red-500' },
        { label: 'Available Balance', value: balance, color: 'text-blue-600' },
        { label: 'Total Saving', value: totalSaving, color: 'text-orange-500' },
        { label: 'Invest', value: invest, color: 'text-purple-600' },
        { label: 'Transactions', value: transactions, color: 'text-gray-600' },
    ];

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item, index) => (
                <SummaryCardItem key={index} {...item} />
            ))}
        </section>
    );
}
