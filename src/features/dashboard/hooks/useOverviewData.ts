import { useEffect, useState } from 'react';
import { getOverviewTransactions } from '../../transactions/api/transactionApi';
import { OverviewTransaction } from 'src/models/OverviewTransaction';
import { FetchTransactionsParams } from 'src/models/FetchTransactionsParams';

export function useOverviewData(params: FetchTransactionsParams) {
    const [overview, setOverview] = useState<OverviewTransaction | null>(null);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        getOverviewTransactions(params)
            .then(setOverview)
            .catch(setError);
    }, [JSON.stringify(params)]);

    return { overview, error };
}
