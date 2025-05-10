'use client';
import { useState } from 'react';
import { useTransactionData } from './useTransactionData';
import { SortableColumn } from '../type/SortableColumn';
import { sortTransactions } from 'src/lib/sortTransactions';

export function useTransactions() {
    const { transactions, error, loading, filters, handleChange } = useTransactionData();

    const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: SortableColumn) => {
        if (sortColumn === column) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedTransactions = sortTransactions(transactions, sortColumn, sortOrder);

    const totalDebit = sortedTransactions.reduce((acc, tx) => acc + (tx.debit || 0), 0);
    const totalCredit = sortedTransactions.reduce((acc, tx) => acc + (tx.credit || 0), 0);
    const netChange = totalCredit - totalDebit;
    const currentBalance = sortedTransactions.at(-1)?.balance || 0;

    return {
        transactions,
        error,
        loading,
        filters,
        handleChange,
        sortColumn,
        sortOrder,
        handleSort,
        sortedTransactions,
        totalDebit,
        totalCredit,
        netChange,
        currentBalance,
    };
}
