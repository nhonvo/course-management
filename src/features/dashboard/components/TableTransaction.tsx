
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SortableColumn } from '../../../lib/type/SortableColumn';
import { currencyFormat } from 'src/lib/utilities';
import { Transaction } from 'src/models/Transaction';

type Props = {
    loading: boolean,
    error: string | null,
    handleSort: (column: SortableColumn) => void,
    sortColumn: string | null,
    sortOrder: string,
    sortedTransactions: Transaction[]
};
export default function TableTransaction({
    loading,
    error,
    handleSort,
    sortColumn,
    sortOrder,
    sortedTransactions }: Props) {
    return (
        <section>
            {loading ? (
                <p className="text-gray-500">Loading transactions...</p>
            ) : error ? (
                <p className="text-red-600">Error: {error}</p>
            ) : (
                <Table className="min-w-full border border-gray-300 mt-4">
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {['transaction_date', 'description', 'counter_account', 'debit', 'credit', 'balance', 'category'].map((col) => (
                                <TableHead
                                    key={col}
                                    className="border px-4 py-2 cursor-pointer"
                                    onClick={() => handleSort(col as SortableColumn)}
                                >
                                    {col.charAt(0).toUpperCase() + col.slice(1).replace('_', ' ')}{' '}
                                    {sortColumn === col && (sortOrder === 'asc' ? '↑' : '↓')}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedTransactions.slice(0, 10).map((tx, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="border px-4 py-2">{tx.transaction_date}</TableCell>
                                <TableCell className="border px-4 py-2 whitespace-normal break-words">{tx.description}</TableCell>
                                <TableCell className="border px-4 py-2 whitespace-normal break-words">{tx.counter_account}</TableCell>
                                <TableCell className="border px-4 py-2">{currencyFormat(tx.debit)}</TableCell>
                                <TableCell className="border px-4 py-2">{currencyFormat(tx.credit)}</TableCell>
                                <TableCell className="border px-4 py-2">{currencyFormat(tx.balance)}</TableCell>
                                <TableCell className="border px-4 py-2">{tx.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </section>
    );
}