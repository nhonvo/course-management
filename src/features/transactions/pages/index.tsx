'use client';

import { useTransactions } from '../hooks/useTransactions';
import TransactionFilters from '../components/TransactionFilters';
import SummaryCards from '../components/SummaryCards';
import BalanceLineChart from '../components/BalanceLineChart';
import MonthlyIncomeExpenseChart from '../components/MonthlyIncomeExpenseChart';
import TableTransaction from '../components/TableTransaction';
import { useState } from 'react';

export default function Home() {
    const {
        error,
        loading,
        filters,
        handleChange,
        sortOrder,
        sortColumn,
        sortedTransactions,
        handleSort,
        totalDebit,
        totalCredit,
        netChange,
        currentBalance,
    } = useTransactions();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="min-h-screen max-w-screen flex flex-col md:flex-row">
                {/* Sidebar */}
                <aside
                    className={`w-64 bg-gray-100 p-6 border-r border-gray-300 space-y-4 fixed inset-0 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } md:translate-x-0 md:relative md:block md:w-64`}
                >
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden absolute top-6 right-6 text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </button>
                    <h2 className="text-xl font-bold mb-4">Sections</h2>
                    <nav className="space-y-2">
                        <a href="#overview" className="block text-gray-700 hover:text-blue-600">Overview</a>
                        <a href="#monthly" className="block text-gray-700 hover:text-blue-600">Monthly</a>
                        <a href="#saving" className="block text-gray-700 hover:text-blue-600">Saving & Investment</a>
                        <a href="#rent" className="block text-gray-700 hover:text-blue-600">House Rent</a>
                        <a href="#highlight" className="block text-gray-700 hover:text-blue-600">Highlight</a>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6 space-y-6 max-w-7xl ">
                    <TransactionFilters filters={filters} handleChange={handleChange} />

                    <section id="overview">
                        <h1 className="text-2xl font-bold">Overview</h1>
                        <SummaryCards
                            totalDebit={totalDebit}
                            totalCredit={totalCredit}
                            netChange={netChange}
                            currentBalance={currentBalance}
                        />
                        <MonthlyIncomeExpenseChart transactions={sortedTransactions} />
                        <BalanceLineChart data={sortedTransactions.map(tx => ({
                            transaction_date: tx.transaction_date,
                            balance: tx.balance,
                        }))} />
                    </section>

                    <section id="monthly">
                        <h2 className="text-xl font-semibold">Monthly</h2>
                        {/* Add Monthly charts or data here */}
                    </section>

                    <section id="saving">
                        <h2 className="text-xl font-semibold">Saving & Investment</h2>
                        {/* Add savings/investment insights here */}
                    </section>

                    <section id="rent">
                        <h2 className="text-xl font-semibold">House Rent</h2>
                        {/* Filter or visualize rent-related transactions */}
                    </section>

                    <section id="highlight">
                        <h2 className="text-xl font-semibold">Highlight</h2>
                        {/* Top spending, top category, highest month, etc. */}
                    </section>

                    {/* Filters and table */}
                    <TableTransaction
                        loading={loading}
                        error={error}
                        handleSort={handleSort}
                        sortColumn={sortColumn}
                        sortOrder={sortOrder}
                        sortedTransactions={sortedTransactions}
                    />
                </main>
            </div>
        </>
    );
}
