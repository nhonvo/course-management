import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/app/shared/components/ui/table";
import { Button } from "@/app/shared/components/ui/button";
import { Course } from "../models/Course";
import { Fragment, useState } from "react";
import clsx from "clsx";
import { Subscription } from "../models/Subscription";
import { Trash2 } from "lucide-react";
import { format, differenceInDays, isBefore, isAfter } from "date-fns";

interface Props {
    courses: Course[];
    onAddSubscription: (courseId: string, newSubscription: Subscription) => void;
    onRemoveSubscription: (courseId: string, subscriptionId: string) => void;
    onUpdateSubscriptionStatus: (
        courseId: string,
        subscriptionId: string
    ) => void;
    onDeleteCourse: (courseId: string) => void;
}

const isNearlyExpired = (expiryDate: string): boolean => {
    return differenceInDays(new Date(expiryDate), new Date()) <= 7;
};

const CourseTable = ({
    courses,
    onAddSubscription,
    onRemoveSubscription,
    onUpdateSubscriptionStatus,
    onDeleteCourse,
}: Props) => {
    const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
    const [newSubscription, setNewSubscription] = useState<Subscription | null>(
        null
    );

    const toggleExpand = (id: string) => {
        setExpandedCourseId((prev) => (prev === id ? null : id));
    };

    const getStatus = (sub: Subscription) => {
        const expired = isBefore(new Date(sub.expiryDate), new Date());
        if (sub.hasRenewed) return "Renewed";
        if (expired) return "Expired";
        return "Active";
    };

    const handleAddSubscription = (courseId: string) => {
        if (!newSubscription?.expiryDate) return;
        const subscriptionToAdd: Subscription = {
            ...newSubscription,
            id: newSubscription.id ?? `sub-${Date.now()}`,
            hasRenewed: newSubscription.hasRenewed ?? false,
        };
        onAddSubscription(courseId, subscriptionToAdd);
        setNewSubscription(null);
    };

    const preventPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Latest Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map((course) => {
                    const latest = course.subscriptions.at(-1);
                    const expanded = expandedCourseId === course.id;

                    return (
                        <Fragment key={course.id}>
                            <TableRow
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleExpand(course.id)}
                                aria-expanded={expanded}
                            >
                                <TableCell>{course.name}</TableCell>
                                <TableCell>{course.teacher}</TableCell>
                                <TableCell
                                    className={clsx({
                                        "bg-red-50":
                                            latest &&
                                            isBefore(new Date(latest.expiryDate), new Date()),
                                    })}
                                >
                                    {latest
                                        ? format(new Date(latest.expiryDate), "yyyy-MM-dd")
                                        : "N/A"}
                                </TableCell>
                                <TableCell>
                                    {latest && (
                                        <span
                                            className={clsx(
                                                "text-xs font-semibold px-2 py-1 rounded",
                                                {
                                                    "bg-green-100 text-green-800":
                                                        getStatus(latest) === "Active",
                                                    "bg-yellow-100 text-yellow-800":
                                                        getStatus(latest) === "Active" &&
                                                        isNearlyExpired(latest.expiryDate),
                                                    "bg-red-100 text-red-800":
                                                        getStatus(latest) === "Expired",
                                                    "bg-blue-100 text-blue-800":
                                                        getStatus(latest) === "Renewed",
                                                }
                                            )}
                                        >
                                            {getStatus(latest)}
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={(e) => {
                                            preventPropagation(e);
                                            onDeleteCourse(course.id);
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded inline-flex items-center gap-1"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </Button>
                                </TableCell>
                            </TableRow>

                            {expanded && (
                                <TableRow className="bg-gray-50">
                                    <TableCell colSpan={5}>
                                        <div className="pl-6 pt-2">
                                            <div className="text-sm font-semibold mb-1">
                                                📋 Subscriptions
                                            </div>
                                            <ul className="space-y-2">
                                                {course.subscriptions.map((sub) => (
                                                    <li
                                                        key={sub.id}
                                                        className="flex flex-wrap justify-between gap-2 items-center text-sm py-1 border-b"
                                                    >
                                                        <span>
                                                            ⏳{" "}
                                                            {format(new Date(sub.expiryDate), "yyyy-MM-dd")}
                                                        </span>
                                                        <span>
                                                            {sub.hasRenewed ? (
                                                                <span className="text-green-600">
                                                                    ✔ Renewed
                                                                </span>
                                                            ) : (
                                                                <span className="text-gray-500">
                                                                    Not Renewed
                                                                </span>
                                                            )}
                                                        </span>
                                                        <div className="space-x-2">
                                                            <Button
                                                                onClick={(e) => {
                                                                    preventPropagation(e);
                                                                    onUpdateSubscriptionStatus(course.id, sub.id);
                                                                }}
                                                                className="bg-blue-400 hover:bg-blue-500"
                                                            >
                                                                {sub.hasRenewed
                                                                    ? "Mark as Expired"
                                                                    : "Mark as Renewed"}
                                                            </Button>
                                                            <Button
                                                                onClick={(e) => {
                                                                    preventPropagation(e);
                                                                    onRemoveSubscription(course.id, sub.id);
                                                                }}
                                                                className="bg-red-400 hover:bg-red-500"
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Add New Subscription */}
                                            <div className="mt-4">
                                                <div className="text-sm font-semibold mb-1">
                                                    ➕ Add New Subscription
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="date"
                                                        className="border p-1 rounded"
                                                        value={newSubscription?.expiryDate ?? ""}
                                                        onClick={preventPropagation}
                                                        onChange={(e) => {
                                                            const inputDate = e.target.value;
                                                            setNewSubscription({
                                                                id: crypto.randomUUID(),
                                                                expiryDate: inputDate,
                                                                hasRenewed: isAfter(
                                                                    new Date(inputDate),
                                                                    new Date()
                                                                ),
                                                            });
                                                        }}
                                                    />
                                                    <Button
                                                        onClick={(e) => {
                                                            preventPropagation(e);
                                                            handleAddSubscription(course.id);
                                                        }}
                                                        className="bg-green-500 hover:bg-green-600 text-white"
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </Fragment>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default CourseTable;
