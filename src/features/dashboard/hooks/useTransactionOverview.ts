import { useTotalCalculations } from './useTotalCalculations';
import { useOverviewData } from './useOverviewData';
import { useSummaryData } from './useSummaryData';
import { useExpenseTreeData } from './useExpenseTreeData';

import { FetchTransactionsParams } from 'src/models/FetchTransactionsParams';
import { Transaction } from 'src/models/Transaction';

export function useTransactionOverview(params: FetchTransactionsParams, transactions: Transaction[], loading: boolean) {
    const { overview, error: overviewError } = useOverviewData(params);
    const { summary, error: summaryError } = useSummaryData(params);
    const { expenseTreeMap, error: treeError } = useExpenseTreeData(params);

    const { totalDebit, totalCredit, netChange, currentBalance } = useTotalCalculations(transactions);

    const error = overviewError || summaryError || treeError;

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
    };
}
