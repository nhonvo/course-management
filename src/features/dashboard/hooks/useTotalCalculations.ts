import { Transaction } from 'src/models/Transaction';

export function useTotalCalculations(transactions: Transaction[]) {
    const totalDebit = transactions.reduce((acc, tx) => acc + (tx.debit || 0), 0);
    const totalCredit = transactions.reduce((acc, tx) => acc + (tx.credit || 0), 0);
    const netChange = totalCredit - totalDebit;
    const currentBalance = transactions.at(-1)?.balance || 0;

    return { totalDebit, totalCredit, netChange, currentBalance };
}
