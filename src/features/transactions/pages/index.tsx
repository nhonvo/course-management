'use client';

import { useTransactions } from '../hooks/useTransactions';
import TransactionFilters from '../components/TransactionFilters';
import SummaryCards from '../../dashboard/components/SummaryCards';
import BalanceLineChart from '../../dashboard/components/BalanceLineChart';
import MonthlyIncomeExpenseChart from '../../dashboard/components/MonthlyIncomeExpenseChart';
import TableTransaction from '../../dashboard/components/TableTransaction';
import ExpenseTreeMap from '../../dashboard/components/ExpenseTreeMap';
import DetailedTransactionAnalysis from '../../dashboard/components/DetailedTransactionAnalysisChart';
import TransactionDistributionChart from '../../dashboard/components/TransactionDistributionChart';
import { SavingService } from '../service/savingService';
import SavingTable from '../../saving/components/SavingTable';
import CumulativeBalanceLineChart from '../../saving/components/CumulativeBalanceLineChart';
import MonthlyBalanceBarChart from '../../saving/components/MonthlyBalanceBarChart';
import { filterHouseFeeTransactions, groupHouseFeeMonthlyTotals, mergeMonthlyReports, prepareHouseFeeReport } from '../service/houseFeeService';

export default function Home() {
    const {
        transactions,
        error,
        loading,
        filters,
        handleChange,
        sortColumn,
        sortOrder,
        handleSort,
        sortedTransactions,
        overview,
        summary,
        totalDebit,
        totalCredit,
        netChange,
        currentBalance,
        expenseTreeMap,
        saving,
        invest,
    } = useTransactions();


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

    const rentHouseFiltered = filterHouseFeeTransactions(transactions, ["tiền nhà"]);
    const rentHouseGrouped = groupHouseFeeMonthlyTotals(rentHouseFiltered);

    const managementFeeFiltered = filterHouseFeeTransactions(transactions, ["phí quản lý"]);
    const managementFeeGrouped = groupHouseFeeMonthlyTotals(managementFeeFiltered);

    const electricFeeFiltered = filterHouseFeeTransactions(transactions, ["tiền điện nước"]);
    const electricFeeGrouped = groupHouseFeeMonthlyTotals(electricFeeFiltered);

    return (
        <>
            {/* Main content */}
            <main className="flex-1 p-6 space-y-6 max-w-7xl">
                <TransactionFilters filters={filters} handleChange={handleChange} />

                <section id="overview">
                    <h1 className="text-2xl font-bold mb-4">Overview</h1>
                    <SummaryCards
                        totalDebit={totalDebit}
                        totalCredit={totalCredit}
                        netChange={netChange}
                        currentBalance={currentBalance}
                        income={overview?.income || 0}
                        expense={overview?.expense || 0}
                        saving={overview?.saving || 0}
                        total={summary?.total || 0}
                        balance={summary?.balance || 0}
                        totalSaving={summary?.totalSaving || 0}
                        invest={summary?.invest || 0}
                        transactions={summary?.transactions || 0}
                    />
                    <MonthlyIncomeExpenseChart transactions={sortedTransactions} />
                    <BalanceLineChart
                        data={sortedTransactions.map((tx) => ({
                            transaction_date: tx.transaction_date,
                            balance: tx.balance,
                        }))}
                    />

                    {/* Filters and table */}
                    <TableTransaction
                        loading={loading}
                        error={error}
                        handleSort={handleSort}
                        sortColumn={sortColumn}
                        sortOrder={sortOrder}
                        sortedTransactions={sortedTransactions}
                    />
                </section>

                <ExpenseTreeMap data={expenseTreeMap ?? []} />

                <section id="monthly">
                    <h2 className="text-xl font-semibold mb-4">Monthly</h2>
                </section>

                <section id="saving">
                    <h2 className="text-xl font-semibold mb-6">Saving & Investment</h2>
                    <DetailedTransactionAnalysis data={sortedTransactions} />
                    <TransactionDistributionChart transactions={transactions} />
                </section>

                <section id="highlight" className="space-y-10">
                    <h2 className="text-xl font-semibold mb-4">Highlight</h2>

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
                </section>
            </main>
        </>
    );
}
