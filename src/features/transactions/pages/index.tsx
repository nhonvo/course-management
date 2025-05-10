'use client';

import { useTransactions } from '../hooks/useTransactions';
import TransactionFilters from '../components/TransactionFilters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SortableColumn } from '../type/SortableColumn';
import SummaryCards from '../components/SummaryCards';
import BalanceLineChart from '../components/BalanceLineChart';
import MonthlyIncomeExpenseChart from '../components/MonthlyIncomeExpenseChart';
import { currencyFormat } from 'src/lib/utilities';

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
    } = useTransactions();
    const totalDebit = sortedTransactions.reduce((acc, tx) => acc + (tx.debit || 0), 0);
    const totalCredit = sortedTransactions.reduce((acc, tx) => acc + (tx.credit || 0), 0);
    const netChange = totalCredit - totalDebit;
    const currentBalance = sortedTransactions.at(-1)?.balance || 0;

    return (
        <main className="p-6 space-y-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">Transaction Dashboard</h1>
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

            {/* Filter Controls */}
            <TransactionFilters filters={filters} handleChange={handleChange} />

            {/* Table Display */}
            <section>
                {loading ? (
                    <p className="text-gray-500">Loading transactions...</p>
                ) : error ? (
                    <p className="text-red-600">Error: {error}</p>
                ) : (
                    <Table className="min-w-full border border-gray-300 mt-4">
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                {['transaction_date', 'description', 'debit', 'credit', 'balance', 'category'].map((col) => (
                                    <TableHead
                                        key={col}
                                        className="border px-4 py-2 cursor-pointer"
                                        onClick={() => handleSort(col as SortableColumn)}
                                    >
                                        {col.charAt(0).toUpperCase() + col.slice(1).replace('_', ' ')}{' '}
                                        {sortColumn === col && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedTransactions.map((tx, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="border px-4 py-2">{tx.transaction_date}</TableCell>
                                    <TableCell className="border px-4 py-2">{tx.description}</TableCell>
                                    <TableCell className="border px-4 py-2">{currencyFormat(tx.debit)}</TableCell>
                                    <TableCell className="border px-4 py-2">{currencyFormat(tx.credit)}</TableCell>
                                    <TableCell className="border px-4 py-2">{currencyFormat(tx.balance)}</TableCell>
                                    <TableCell className="border px-4 py-2">{tx.category}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </section>
        </main>
    );
}
