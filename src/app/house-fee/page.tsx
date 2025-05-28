// app/house-fee/page.tsx
'use client';

import HouseFeeSummary from 'src/features/houseFee/components/HouseFeeSummary';
import { useTransactions } from '../../features/transactions/hooks/useTransactions';
import { filterHouseFeeTransactions, groupHouseFeeMonthlyTotals, mergeMonthlyReports, prepareHouseFeeReport } from '../../features/transactions/service/houseFeeService';
import HouseFeeChart from 'src/features/houseFee/components/HouseFeeChart';
import MonthlyExpenseTable from 'src/features/houseFee/components/MonthlyExpenseTable';

export default function HouseFee() {
    const { transactions } = useTransactions();

    const rentHouseFiltered = filterHouseFeeTransactions(transactions, ["tiền nhà"]);
    const rentHouseGrouped = groupHouseFeeMonthlyTotals(rentHouseFiltered);

    const managementFeeFiltered = filterHouseFeeTransactions(transactions, ["phí quản lý"]);
    const managementFeeGrouped = groupHouseFeeMonthlyTotals(managementFeeFiltered);

    const electricFeeFiltered = filterHouseFeeTransactions(transactions, ["tiền điện nước"]);
    const electricFeeGrouped = groupHouseFeeMonthlyTotals(electricFeeFiltered);

    const prepared = prepareHouseFeeReport(rentHouseGrouped);
    const mergeData = mergeMonthlyReports(rentHouseGrouped, managementFeeGrouped, electricFeeGrouped);

    return (
        <main className="p-6 space-y-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">House Rent Summary</h2>
            <HouseFeeSummary monthlyReport={mergeData} />
            <HouseFeeChart data={prepared} />
            <MonthlyExpenseTable monthlyReport={mergeData} />
        </main>
    );
}
