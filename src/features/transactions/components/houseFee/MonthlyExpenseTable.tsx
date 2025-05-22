import React from "react";
import { MonthlyReportItem } from "../../service/houseFeeService";


type Props = {
    monthlyReport: MonthlyReportItem[];
};

const MonthlyExpenseTable: React.FC<Props> = ({ monthlyReport }) => (
    <section>
        <h3>Monthly Expense Distribution</h3>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Rent Payment</th>
                    <th>Management Fee</th>
                    <th>Utility Payment</th>
                    <th>Sum</th>
                </tr>
            </thead>
            <tbody>
                {monthlyReport.map((item) => (
                    <tr key={item.month}>
                        <td>{item.month}</td>
                        <td>{item.formattedRentPayment}</td>
                        <td>{item.formattedManagementFee}</td>
                        <td>{item.formattedUtilityPayment}</td>
                        <td>{item.formattedSum}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
);

export default MonthlyExpenseTable;
