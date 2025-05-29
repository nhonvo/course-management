import React from "react";
import MonthlyExpenseTable from "./MonthlyExpenseTable";
import AreaChartComponent from "./AreaChartComponent";
import { MonthlyReportItem } from "src/features/houseFee/service/houseFeeService";

type Props = {
    monthlyReport: MonthlyReportItem[];
};

const COLORS = {
    rent: "#1f77b4",
    management: "#2ca02c",
    utility: "#ff7f0e",
};

const HouseFeeSummary: React.FC<Props> = ({ monthlyReport }) => (
    <div className="house-fee-summary">
        <h2>Household Expense Summary</h2>
        <p>
            This section provides a comprehensive overview of your household
            expenses, including monthly rent, management fees, and utility
            payments. The insights below offer a breakdown of each category to help
            track and manage monthly costs.
        </p>

        <MonthlyExpenseTable monthlyReport={monthlyReport} />

        <section style={{ marginTop: 40 }}>
            <h3>Monthly Rent Payments</h3>
            <AreaChartComponent
                data={monthlyReport}
                dataKey="rentPayment"
                strokeColor={COLORS.rent}
                fillColor={COLORS.rent}
                name="Rent Payment"
            />
        </section>

        <section style={{ marginTop: 40 }}>
            <h3>Monthly Management Fees</h3>
            <AreaChartComponent
                data={monthlyReport}
                dataKey="managementFee"
                strokeColor={COLORS.management}
                fillColor={COLORS.management}
                name="Management Fee"
            />
        </section>

        <section style={{ marginTop: 40 }}>
            <h3>Monthly Utility Payments</h3>
            <AreaChartComponent
                data={monthlyReport}
                dataKey="utilityPayment"
                strokeColor={COLORS.utility}
                fillColor={COLORS.utility}
                name="Utility Payment"
            />
        </section>
    </div>
);

export default HouseFeeSummary;
