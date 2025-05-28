'use client';

import { useTransactions } from '../../features/transactions/hooks/useTransactions';
import DetailedTransactionAnalysis from '../../features/dashboard/components/DetailedTransactionAnalysisChart';
import TransactionDistributionChart from '../../features/dashboard/components/TransactionDistributionChart';
import { SavingService } from '../../features/transactions/service/savingService';
import SavingTable from '../../features/saving/components/SavingTable';
import CumulativeBalanceLineChart from '../../features/saving/components/CumulativeBalanceLineChart';
import MonthlyBalanceBarChart from '../../features/saving/components/MonthlyBalanceBarChart';

export default function SavingPage() {
    const { saving, invest, transactions } = useTransactions();

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
        <main className="p-6 space-y-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Saving & Investment</h2>

            <DetailedTransactionAnalysis data={transactions} />
            <TransactionDistributionChart transactions={transactions} />

            {/* Savings Section */}
            <div>
                <h3 className="text-lg font-medium mb-2">Total Savings</h3>
                <p className="mb-4 text-green-700 font-semibold">{format(totalSaving)}</p>
                <SavingTable rows={tableSavingData} />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CumulativeBalanceLineChart data={lineSavingData} />
                    <MonthlyBalanceBarChart data={barSavingData} />
                </div>
            </div>

            {/* Investment Section */}
            <div>
                <h3 className="text-lg font-medium mt-10 mb-2">Total Investment</h3>
                <p className="mb-4 text-green-700 font-semibold">{format(totalInvest)}</p>
                <SavingTable rows={tableInvestData} />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CumulativeBalanceLineChart data={lineInvestData} />
                    <MonthlyBalanceBarChart data={barInvestData} />
                </div>
            </div>
        </main>
    );
}
