import { currencyFormat } from "src/lib/utilities";
import { Transaction } from "src/models/Transaction";

interface MonthlyBalance {
    date: string;
    balance: number;
    cumulativeBalance: number;
    formattedBalance: string;
    formattedCumulativeBalance: string;
}

export class SavingService {
    private transactions: Transaction[];
    private monthlyData: MonthlyBalance[] = [];

    constructor(transactions: Transaction[]) {
        this.transactions = transactions
            .filter((t) => !!t.transaction_date)
            .map((t) => ({
                ...t,
                // transaction_date: dayjs(t.transaction_date).format("YYYY-MM-DD"),
                transaction_date:new Date(t.transaction_date).toISOString().slice(0, 7),

            }));

        this.calculateMonthlyBalance();
    }

    private calculateMonthlyBalance() {
        const monthlyMap: Map<string, number> = new Map();

        for (const transaction of this.transactions) {
            const monthKey = new Date(transaction.transaction_date).toISOString().slice(0, 7);

            const current = monthlyMap.get(monthKey) ?? 0;
            monthlyMap.set(monthKey, current + transaction.balance);
        }

        const sortedMonths = Array.from(monthlyMap.entries()).sort(([a], [b]) =>
            a.localeCompare(b)
        );

        let cumulative = 0;

        this.monthlyData = sortedMonths.map(([date, balance]) => {
            cumulative += balance;
            return {
                date,
                balance,
                cumulativeBalance: cumulative,
                formattedBalance: currencyFormat(balance),
                formattedCumulativeBalance: currencyFormat(cumulative),
            };
        });
    }

    getBarChartData(): { date: string; balance: number }[] {
        return this.monthlyData.map((item) => ({
            date: item.date,
            balance: item.balance,
        }));
    }

    getLineChartData(): { date: string; cumulativeBalance: number }[] {
        return this.monthlyData.map((item) => ({
            date: item.date,
            cumulativeBalance: item.cumulativeBalance,
        }));
    }

    getTableData(): {
        date: string;
        credit: string;
        balance: string;
    }[] {
        return this.monthlyData.slice(-10).map((item) => ({
            date: item.date,
            credit: item.formattedBalance,
            balance: item.formattedCumulativeBalance,
        }));
    }

    getTotalSaving(): number {
        return this.transactions.reduce((acc, cur) => acc + cur.balance, 0);
    }
}
