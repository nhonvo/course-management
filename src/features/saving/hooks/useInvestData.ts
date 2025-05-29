import { useEffect, useState } from 'react';
import { getInvestTransactions } from '../../transactions/api/transactionApi';
import { Transaction } from 'src/models/Transaction';
import { FetchTransactionsParams } from 'src/models/FetchTransactionsParams';

export function useInvestData(params: FetchTransactionsParams) {
    const [invest, setInvest] = useState<Transaction[] | null>(null);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        getInvestTransactions(params)
            .then(setInvest)
            .catch(setError);
    }, [JSON.stringify(params)]);

    return { invest, error };
}
