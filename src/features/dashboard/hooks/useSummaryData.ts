import { useEffect, useState } from 'react';
import { getSummaryTransactions } from '../../transactions/api/transactionApi';
import { SummaryTransaction } from 'src/models/SummaryTransaction';
import { FetchTransactionsParams } from 'src/models/FetchTransactionsParams';

export function useSummaryData(params: FetchTransactionsParams) {
    const [summary, setSummary] = useState<SummaryTransaction | null>(null);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        getSummaryTransactions(params)
            .then(setSummary)
            .catch(setError);
    }, [JSON.stringify(params)]);

    return { summary, error };
}
