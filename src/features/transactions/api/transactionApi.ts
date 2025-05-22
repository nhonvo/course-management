import { fetcher } from "src/lib/api-client/fetcher";
import { ExpenseTreeMapModel } from "src/models/ExpenseTreeMapModel";
import { FetchTransactionsParams } from "src/models/FetchTransactionsParams";
import { OverviewTransaction } from "src/models/OverviewTransaction";
import { SummaryTransaction } from "src/models/SummaryTransaction";
import { Transaction } from "src/models/Transaction";

export const getTransactions = async (params: FetchTransactionsParams): Promise<Transaction[]> => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return fetcher<Transaction[]>(`/api/v1/transactions?${query}`);
};

export const getOverviewTransactions = async (params: FetchTransactionsParams): Promise<OverviewTransaction> => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return fetcher<OverviewTransaction>(`/api/v1/transactions/overview?${query}`);
};

export const getSummaryTransactions = async (params: FetchTransactionsParams): Promise<SummaryTransaction> => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return fetcher<SummaryTransaction>(`/api/v1/transactions/summary?${query}`);
};

export const getExpenseTree = async (params: FetchTransactionsParams): Promise<ExpenseTreeMapModel[]> => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return fetcher<ExpenseTreeMapModel[]>(`/api/v1/transactions/expense-tree?${query}`);
};
