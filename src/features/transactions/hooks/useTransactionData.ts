// hooks/useTransactionData.ts
import { useEffect, useState } from 'react';
import { Transaction } from 'src/models/Transaction';
import { getTransactions } from '../api/transactionApi';
import { TransactionFiltersProps } from 'src/models/TransactionFilters';
import { getDefaultDateRange } from 'src/lib/utilities';

export function useTransactionData() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { start_date, end_date } = getDefaultDateRange();

    const [filters, setFilters] = useState<TransactionFiltersProps>({
        order_by: true,
        sort_by: 'debit',
        offset: 0,
        clean: true,
        limit: -1,
        start_date: '2023-01-01',
        end_date: '2023-04-01',
        // start_date: start_date,
        // end_date: end_date,
    });

    const handleChange = (name: string, value: string | number | boolean) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        setLoading(true);
        getTransactions(filters)
            .then(setTransactions)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [filters]);

    return { transactions, error, loading, filters, handleChange, setTransactions };
}
