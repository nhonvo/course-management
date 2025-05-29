'use client';

import { SavingService } from '../../features/saving/service/savingService';
import SavingTable from '../../features/saving/components/SavingTable';
import CumulativeBalanceLineChart from '../../features/saving/components/CumulativeBalanceLineChart';
import MonthlyBalanceBarChart from '../../features/saving/components/MonthlyBalanceBarChart';
import { useInvestData } from 'src/features/saving/hooks/useInvestData';
import { useSavingData } from 'src/features/saving/hooks/useSavingData';
import { TransactionFiltersProps } from 'src/models/TransactionFilters';

export default function SavingPage() {
    const params: TransactionFiltersProps = {
        order_by: true,
        sort_by: 'debit',
        offset: 0,
        limit: -1,
        clean: true,
    };
    const { saving } = useSavingData(params);
    const { invest } = useInvestData(params);

    const savingService = new SavingService(saving ?? []);
    const investService = new SavingService(invest ?? []);

    const barSavingData = savingService.getBarChartData();
    const lineSavingData = savingService.getLineChartData();
    const tableSavingData = savingService.getTableData();
    const totalSaving = savingService.getTotalSaving();

    const barInvestData = investService.getBarChartData();
    const lineInvestData = investService.getLineChartData();
    const tableInvestData = investService.getTableData();
    const totalInvest = investService.getTotalSaving();

    const format = (num: number) =>
        num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return (
        <main className="flex-1 p-6 space-y-12 max-w-7xl mx-auto">
            {/* Header */}
            <section>
                <h1 className="text-3xl font-bold mb-2">Savings & Investments</h1>
                <p className="text-gray-600">
                    Track your savings and investment progress over time. Analyze trends and gain insights to improve your financial planning.
                </p>
            </section>

            {/* Savings Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">💰 Your Savings</h2>
                <p className="text-gray-600 mb-4">
                    Review your total savings, track your cumulative progress, and explore month-by-month changes.
                </p>
                <div className="text-green-700 text-lg font-bold mb-4">{format(totalSaving)}</div>
                <SavingTable rows={tableSavingData} />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CumulativeBalanceLineChart data={lineSavingData} />
                    <MonthlyBalanceBarChart data={barSavingData} />
                </div>
            </section>

            {/* Investments Section */}
            <section>
                <h2 className="text-2xl font-semibold mt-12 mb-2">📈 Your Investments</h2>
                <p className="text-gray-600 mb-4">
                    Get a clear view of your investments with cumulative and monthly breakdowns.
                </p>
                <div className="text-green-700 text-lg font-bold mb-4">{format(totalInvest)}</div>
                <SavingTable rows={tableInvestData} />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CumulativeBalanceLineChart data={lineInvestData} />
                    <MonthlyBalanceBarChart data={barInvestData} />
                </div>
            </section>
        </main>
    );
}
