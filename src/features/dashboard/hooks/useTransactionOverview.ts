import { useOverviewData } from './useOverviewData';
import { useSummaryData } from './useSummaryData';
import { useExpenseTreeData } from './useExpenseTreeData';

import { FetchTransactionsParams } from 'src/models/FetchTransactionsParams';
import { Transaction } from 'src/models/Transaction';

export function useTransactionOverview(params: FetchTransactionsParams, transactions: Transaction[], loading: boolean) {
    const { overview, error: overviewError } = useOverviewData(params);
    const { summary, error: summaryError } = useSummaryData(params);
    const { expenseTreeMap, error: treeError } = useExpenseTreeData(params);


    const error = overviewError || summaryError || treeError;

    return {
        overview,
        summary,
        loading,
        error,
        expenseTreeMap,
    };
}
