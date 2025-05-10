
export interface FetchTransactionsParams {
    order_by?: boolean;
    sort_by?: string;
    offset?: number;
    clean?: boolean;
    limit?: number;
    start_date?: string; // in format YYYY-MM-DD
    end_date?: string;
}