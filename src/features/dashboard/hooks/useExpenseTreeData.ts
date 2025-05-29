import { useEffect, useState } from 'react';
import { getExpenseTree } from '../../transactions/api/transactionApi';
import { ExpenseTreeMapModel } from 'src/models/ExpenseTreeMapModel';
import { FetchTransactionsParams } from 'src/models/FetchTransactionsParams';

export function useExpenseTreeData(params: FetchTransactionsParams) {
    const [expenseTreeMap, setExpenseTreeMap] = useState<ExpenseTreeMapModel[] | null>(null);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        getExpenseTree(params)
            .then(setExpenseTreeMap)
            .catch(setError);
    }, [JSON.stringify(params)]);

    return { expenseTreeMap, error };
}
