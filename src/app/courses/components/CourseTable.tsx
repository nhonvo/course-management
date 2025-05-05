import {
    Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/app/shared/components/ui/table";
import { Button } from "@/app/shared/components/ui/button";
import { Course } from "../models/Course";

interface Props {
    courses: Course[];
    onExtend: (id: string) => void;
    onCourseClick: (course: Course) => void;
}

const CourseTable = ({ courses, onExtend, onCourseClick }: Props) => {
    const isNearlyExpired = (expiryDate: string) => {
        const now = new Date();
        const expirationDate = new Date(expiryDate);
        const diffDays = (expirationDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 7;
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map((course) => {
                    const latestSub = course.subscriptions.at(-1);
                    const shouldShowExtend =
                        latestSub && isNearlyExpired(latestSub.expiryDate) &&
                        !course.subscriptions.some(s => s.hasRenewed);

                    return (
                        <TableRow key={course.id} onClick={() => onCourseClick(course)}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.teacher}</TableCell>
                            <TableCell>{latestSub?.expiryDate ?? 'N/A'}</TableCell>
                            <TableCell>
                                {shouldShowExtend && (
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onExtend(course.id);
                                        }}
                                        className="bg-yellow-400 hover:bg-yellow-500"
                                    >
                                        Extend
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default CourseTable;
