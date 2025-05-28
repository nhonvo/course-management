import React from 'react';

interface Row {
    date: string;
    credit: string;
    balance: string;
}

interface Props {
    rows: Row[];
}

const SavingTable: React.FC<Props> = ({ rows }) => {
    return (
        <div className="overflow-x-auto">
            <h2 className="text-lg font-semibold text-green-700 mb-2">Recent Saving Summary</h2>
            <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Credit</th>
                        <th className="border p-2">Cumulative Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(({ date, credit, balance }, index) => (
                        <tr key={index} className="text-center">
                            <td className="border p-2">{date}</td>
                            <td className="border p-2">{credit}</td>
                            <td className="border p-2">{balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SavingTable;
