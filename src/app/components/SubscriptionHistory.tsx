import { Course } from "../models/Course";
import {
    Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {
    course: Course;
    onToggleRenewed: (sub: { id: string; hasRenewed: boolean }) => void;
}

const SubscriptionHistory = ({ course, onToggleRenewed }: Props) => {
    return (
        <div className="mt-4">
            <h3>Subscription History for {course.name}</h3>
            <Table className="min-w-full mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Renewed</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {course.subscriptions.map((sub) => (
                        <TableRow key={sub.id}>
                            <TableCell>{sub.expiryDate}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleRenewed(sub);
                                    }}
                                    className={`px-2 py-1 rounded ${sub.hasRenewed ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                    {sub.hasRenewed ? 'Renewed' : 'Not Renewed'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SubscriptionHistory;
