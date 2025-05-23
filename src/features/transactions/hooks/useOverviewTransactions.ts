'use client';

import { useEffect, useState } from 'react';
import { FetchTransactionsParams } from 'src/models/FetchTransactionsParams';
import { OverviewTransaction } from 'src/models/OverviewTransaction';
import { SummaryTransaction } from "src/models/SummaryTransaction";
import { getExpenseTree, getInvestTransactions, getOverviewTransactions, getSavingTransactions, getSummaryTransactions } from '../api/transactionApi';
import { Transaction } from 'src/models/Transaction';
import { ExpenseTreeMapModel } from 'src/models/ExpenseTreeMapModel';

export function useOverviewTransactions(params: FetchTransactionsParams, transactions: Transaction[], loading: boolean) {
    const [overview, setData] = useState<OverviewTransaction | null>(null);
    const [summary, setDataSummary] = useState<SummaryTransaction | null>(null);
    const [expenseTreeMap, setExpenseTreeMap] = useState<ExpenseTreeMapModel[] | null>(null);
    const [invest, setInvest] = useState<Transaction[] | null>(null);
    const [saving, setSaving] = useState<Transaction[] | null>(null);
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

        getExpenseTree(params)
            .then(setExpenseTreeMap)
            .catch(setError)
            .finally(() => setLoading(false));

        getSavingTransactions(params)
            .then(setSaving)
            .catch(setError)
            .finally(() => setLoading(false));

        getInvestTransactions(params)
            .then(setInvest)
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
        error,
        expenseTreeMap,
        saving,
        invest
    };
}
