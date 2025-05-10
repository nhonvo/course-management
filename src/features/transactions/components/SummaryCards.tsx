'use client';

import { Card, CardContent } from '@/components/ui/card';

interface SummaryCardsProps {
    totalDebit: number;
    totalCredit: number;
    netChange: number;
    currentBalance: number;
}

export default function SummaryCards({ totalDebit, totalCredit, netChange, currentBalance }: SummaryCardsProps) {
    const format = (num: number) => num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm text-gray-500">Total Debit</p>
                    <p className="text-xl font-bold text-red-600">{format(totalDebit)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm text-gray-500">Total Credit</p>
                    <p className="text-xl font-bold text-green-600">{format(totalCredit)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm text-gray-500">Net Change</p>
                    <p className="text-xl font-bold">{format(netChange)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm text-gray-500">Current Balance</p>
                    <p className="text-xl font-bold text-blue-600">{format(currentBalance)}</p>
                </CardContent>
            </Card>
        </section>
    );
}
