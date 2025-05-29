import { useEffect, useState } from 'react';
import { Transaction } from 'src/models/Transaction';
import { getTransactions } from '../../transactions/api/transactionApi';
import { TransactionFiltersProps } from 'src/models/TransactionFilters';

export function useTransactionData(start_date?: string, end_date?: string) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState<TransactionFiltersProps>({
        order_by: true,
        sort_by: 'debit',
        offset: 0,
        clean: true,
        limit: -1,
        start_date: start_date,
        end_date: end_date,
    });

    const handleChange = (name: string, value: string | number | boolean) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        setLoading(true);
        getTransactions(filters)
            .then(setTransactions)
            .catch(err => setError(err.message || 'Failed to fetch transactions'))
            .finally(() => setLoading(false));
    }, [filters]);

    return { transactions, error, loading, filters, handleChange, setTransactions };
}
