export interface Transaction {
    transaction_date: string; // ISO date string
    description: string;
    effective_date: string;
    debit: number;
    credit: number;
    balance: number;
    counter_account: string;
    category: string;
    transaction_code: string;

    [key: string]: string | number;
}