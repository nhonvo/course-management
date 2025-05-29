import { useEffect, useState } from 'react';
import { getSavingTransactions } from '../../transactions/api/transactionApi';
import { Transaction } from 'src/models/Transaction';
import { FetchTransactionsParams } from 'src/models/FetchTransactionsParams';

export function useSavingData(params: FetchTransactionsParams) {
    const [saving, setSaving] = useState<Transaction[] | null>(null);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        getSavingTransactions(params)
            .then(setSaving)
            .catch(setError);
    }, [JSON.stringify(params)]);

    return { saving, error };
}
