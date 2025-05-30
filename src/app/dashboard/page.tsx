"use client";
import TransactionFilters from "src/features/dashboard/components/TransactionFilters";
import SummaryCards from "src/features/dashboard/components/SummaryCards";
import BalanceLineChart from "src/features/dashboard/components/BalanceLineChart";
import MonthlyIncomeExpenseChart from "src/features/dashboard/components/MonthlyIncomeExpenseChart";
import TableTransaction from "src/features/dashboard/components/TableTransaction";
import ExpenseTreeMap from "src/features/dashboard/components/ExpenseTreeMap";
import DetailedTransactionAnalysis from "src/features/dashboard/components/DetailedTransactionAnalysisChart";
import TransactionDistributionChart from "src/features/dashboard/components/TransactionDistributionChart";
import { useTransactionData } from "src/features/dashboard/hooks/useTransactionData";
import { useTransactionSorting } from "src/features/dashboard/hooks/useTransactionSorting";
import { useTotalCalculations } from "src/features/dashboard/hooks/useTotalCalculations";
import { useTransactionOverview } from "src/features/dashboard/hooks/useTransactionOverview";
import { getDefaultDateRange } from "src/lib/utilities";
import { Transaction } from "src/models/Transaction";

export default function Dashboard() {
    const { start_date, end_date } = getDefaultDateRange();
    const {
        transactions,
        error,
        loading,
        filters,
        handleChange
    } = useTransactionData(start_date, end_date);

    const {
        sortedTransactions,
        sortColumn,
        sortOrder,
        handleSort
    } = useTransactionSorting(transactions);


    const {
        overview,
        summary,
        expenseTreeMap,
    } = useTransactionOverview(filters, sortedTransactions, loading);


    const { totalDebit, totalCredit, netChange, currentBalance } = useTotalCalculations(transactions);

    return (
        <main className="flex-1 p-6 space-y-12 max-w-7xl mx-auto">
            {/* Filters */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Filter Your Transactions</h2>
                <p className="text-gray-600 mb-4">
                    Use these filters to customize the data shown on your dashboard.
                    Filter by date range, category, or account.
                </p>
                <TransactionFilters filters={filters} handleChange={handleChange} />
            </section>

            {/* Overview Section */}
            <section id="overview">
                <h2 className="text-2xl font-bold mb-4">Overview Summary</h2>
                <p className="text-gray-600 mb-6">
                    Get a quick summary of your financial status including total income,
                    expenses, balance, and savings.
                </p>
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
            </section>

            {/* Monthly Trends */}
            <section id="monthly">
                <h2 className="text-2xl font-bold mb-4">Monthly Trends</h2>
                <p className="text-gray-600 mb-6">
                    Visualize how your income and expenses change month by month to
                    identify patterns or unusual spending.
                </p>
                <MonthlyIncomeExpenseChart transactions={sortedTransactions} />
                <BalanceLineChart
                    data={sortedTransactions.map((tx: Transaction) => ({
                        transaction_date: tx.transaction_date,
                        balance: tx.balance,
                    }))}
                />
            </section>

            {/* Transaction Table */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Detailed Transactions</h2>
                <p className="text-gray-600 mb-6">
                    Review your individual transactions in the sortable table below. Click
                    on column headers to sort.
                </p>
                <TableTransaction
                    loading={loading}
                    error={error}
                    handleSort={handleSort}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    sortedTransactions={sortedTransactions}
                />
            </section>

            {/* Tree Map */}
            <section id="highlight">
                <h2 className="text-2xl font-bold mb-4">
                    Expense Breakdown by Category
                </h2>
                <p className="text-gray-600 mb-6">
                    Understand where your money goes with this visual representation of
                    your expenses by category.
                </p>
                <ExpenseTreeMap data={expenseTreeMap ?? []} />
            </section>

            {/* Additional Insights */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Transaction Analysis</h2>
                <p className="text-gray-600 mb-6">
                    Dive deeper into your transaction behavior with detailed charts and
                    distribution views.
                </p>
                <DetailedTransactionAnalysis data={sortedTransactions} />
                <TransactionDistributionChart transactions={transactions} />
            </section>
        </main>
    );
}

