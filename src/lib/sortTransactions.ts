import { SortableColumn } from 'src/lib/type/SortableColumn';
import { Transaction } from 'src/models/Transaction';

export function sortTransactions(transactions: Transaction[], column: SortableColumn | null, order: 'asc' | 'desc') {
    if (!column) return transactions;

    return [...transactions].sort((a, b) => {
        const aVal = a[column];
        const bVal = b[column];

        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
    });
}