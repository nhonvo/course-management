import { fetcher } from "src/lib/api-client/fetcher";
import { FetchTransactionsParams } from "src/models/FetchTransactionsParams";
import { Transaction } from "src/models/Transaction";

export const getTransactions = async (params: FetchTransactionsParams): Promise<Transaction[]> => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return fetcher<Transaction[]>(`/api/v1/transactions?${query}`);
};
