'use client';

import { useEffect, useState } from 'react';
import { FetchTransactionsParams } from 'src/models/FetchTransactionsParams';
import { OverviewTransaction } from 'src/models/OverviewTransaction';
import { SummaryTransaction } from "src/models/SummaryTransaction";
import { getOverviewTransactions, getSummaryTransactions } from '../api/transactionApi';
import { Transaction } from 'src/models/Transaction';

export function useOverviewTransactions(params: FetchTransactionsParams, transactions: Transaction[], loading: boolean) {
    const [overview, setData] = useState<OverviewTransaction | null>(null);
    const [summary, setDataSummary] = useState<SummaryTransaction | null>(null);
    const [, setLoading] = useState(loading);
    const [error, setError] = useState<Error>();

    const sortedTransactions = transactions;
    const totalDebit = sortedTransactions.reduce((acc, tx) => acc + (tx.debit || 0), 0);
    const totalCredit = sortedTransactions.reduce((acc, tx) => acc + (tx.credit || 0), 0);
    const netChange = totalCredit - totalDebit;
    const currentBalance = sortedTransactions.at(-1)?.balance || 0;

    useEffect(() => {
        setLoading(true);
        getOverviewTransactions(params)
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));

        getSummaryTransactions(params)
            .then(setDataSummary)
            .catch(setError)
            .finally(() => setLoading(false));

    }, [JSON.stringify(params)]); // Update when filters change

    return {
        overview,
        summary,
        totalDebit,
        totalCredit,
        netChange,
        currentBalance,
        loading,
        error
    };
}
