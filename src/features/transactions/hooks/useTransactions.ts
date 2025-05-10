'use client';
import { useEffect, useState } from 'react';
import { Transaction } from 'src/models/Transaction';
import { getTransactions } from '../api/transactionApi';
import { TransactionFiltersProps } from 'src/models/TransactionFilters';
import { SortableColumn } from '../type/SortableColumn';
import { getDefaultDateRange } from 'src/lib/utilities';


export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { start_date, end_date } = getDefaultDateRange();

    const [filters, setFilters] = useState<TransactionFiltersProps>({
        order_by: true,
        sort_by: 'debit',
        offset: 0,
        clean: false,
        limit: -1,
        start_date: start_date,
        end_date: end_date,
    });
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: SortableColumn) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };
    const sortedTransactions = [...transactions].sort((a, b) => {
        if (!sortColumn) return 0;
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    useEffect(() => {
        setLoading(true);
        getTransactions(filters)
            .then(setTransactions)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [filters]); // clean & safe

    const handleChange = (name: string, value: string | number | boolean) => {
        setFilters(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    return {
        transactions,
        error,
        loading,
        filters,
        handleChange,
        sortColumn,
        sortOrder,
        sortedTransactions,
        handleSort
    };
}