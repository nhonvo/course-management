'use client';

import HouseFeeSummary from 'src/features/houseFee/components/HouseFeeSummary';
import {
    filterHouseFeeTransactions,
    groupHouseFeeMonthlyTotals,
    mergeMonthlyReports,
    prepareHouseFeeReport
} from '../../features/houseFee/service/houseFeeService';
import HouseFeeChart from 'src/features/houseFee/components/HouseFeeChart';
import MonthlyExpenseTable from 'src/features/houseFee/components/MonthlyExpenseTable';
import { useTransactionData } from 'src/features/dashboard/hooks/useTransactionData';

export default function HouseFee() {
    const {
        transactions,
    } = useTransactionData();

    const rentHouseFiltered = filterHouseFeeTransactions(transactions, ['tiền nhà']);
    const rentHouseGrouped = groupHouseFeeMonthlyTotals(rentHouseFiltered);

    const managementFeeFiltered = filterHouseFeeTransactions(transactions, ['phí quản lý']);
    const managementFeeGrouped = groupHouseFeeMonthlyTotals(managementFeeFiltered);

    const electricFeeFiltered = filterHouseFeeTransactions(transactions, ['tiền điện nước']);
    const electricFeeGrouped = groupHouseFeeMonthlyTotals(electricFeeFiltered);

    const prepared = prepareHouseFeeReport(rentHouseGrouped);
    const mergedData = mergeMonthlyReports(
        rentHouseGrouped,
        managementFeeGrouped,
        electricFeeGrouped
    );

    return (
        <main className="p-6 space-y-10 max-w-7xl mx-auto">
            {/* Page Header */}
            <section>
                <h1 className="text-3xl font-bold mb-2">🏠 Monthly House Fee Overview</h1>
                <p className="text-gray-600">
                    A detailed breakdown of your rent, management, and electric fees across each month.
                </p>
            </section>

            {/* Summary Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">📊 Summary</h2>
                <HouseFeeSummary monthlyReport={mergedData} />
            </section>

            {/* Chart Visualization */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">📈 Rent Fee Trend</h2>
                <p className="text-gray-600 mb-4">
                    This chart illustrates how your *rent expenses* have changed over time.
                </p>
                <HouseFeeChart data={prepared} />
            </section>

            {/* Table Breakdown */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">🧾 Monthly Fee Breakdown</h2>
                <MonthlyExpenseTable monthlyReport={mergedData} />
            </section>
        </main>
    );
}
