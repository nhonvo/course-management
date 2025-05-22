'use client';
import { useState } from 'react';
import { useTransactionData } from './useTransactionData';
import { SortableColumn } from '../type/SortableColumn';
import { sortTransactions } from 'src/lib/sortTransactions';
import { useOverviewTransactions } from './useOverviewTransactions';

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

    const {
        overview,
        summary,
        totalDebit: totalDebit,
        totalCredit: totalCredit,
        netChange: netChange,
        currentBalance: currentBalance,
        expenseTreeMap: expenseTreeMap 
    } = useOverviewTransactions(filters, sortedTransactions, loading);

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
        overview,
        summary,
        totalDebit,
        totalCredit,
        netChange,
        currentBalance,
        expenseTreeMap
    };
}
