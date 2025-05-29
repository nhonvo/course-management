import { useState } from 'react';
import { Transaction } from 'src/models/Transaction';
import { SortableColumn } from '../../../lib/type/SortableColumn';
import { sortTransactions } from 'src/lib/sortTransactions';

export function useTransactionSorting(transactions: Transaction[]) {
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

    return { sortedTransactions, sortColumn, sortOrder, handleSort };
}
