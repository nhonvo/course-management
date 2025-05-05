"use client";
import { useEffect, useState, useCallback } from "react";
import { Course } from './models/Course';
import CourseTable from "./components/CourseTable";
import SubscriptionHistory from "./components/SubscriptionHistory";
import toast from "react-hot-toast";
import AddCourseModal from "./components/AddCourseModal";

const CourseList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showAddModal, setShowAddModal] = useState(false); // ✅ Track modal visibility

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("data/courses.json");
                const data = await res.json();
                setCourses(data);
            } catch {
                toast.error("Failed to load courses.");
            }
        };
        fetchCourses();
    }, []);

    const handleCourseClick = useCallback((course: Course) => {
        setSelectedCourse(course);
    }, []);

    const handleExtend = useCallback((id: string) => {
        setCourses((prevCourses) => {
            const updatedCourses = prevCourses.map((course) => {
                if (course.id !== id || course.subscriptions.some((sub) => sub.hasRenewed))
                    return course;

                const lastSubscription = course.subscriptions.at(-1);
                const lastExpiryDate = new Date(lastSubscription!.expiryDate);
                const newExpiryDate = new Date(lastExpiryDate);
                newExpiryDate.setMonth(lastExpiryDate.getMonth() + 1);

                const newSubscription = {
                    id: crypto.randomUUID(),
                    month: newExpiryDate.toISOString().slice(0, 7),
                    expiryDate: newExpiryDate.toISOString().slice(0, 10),
                    hasRenewed: true,
                };

                return {
                    ...course,
                    subscriptions: [...course.subscriptions, newSubscription],
                };
            });

            // ✅ Keep selectedCourse in sync after update
            const updatedSelected = updatedCourses.find(c => c.id === selectedCourse?.id) || null;
            setSelectedCourse(updatedSelected);

            return updatedCourses;
        });

        toast.success('Subscription has been extended!');
    }, [selectedCourse]);

    const toggleRenewable = useCallback((sub: { id: string; hasRenewed: boolean }) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) => {
                if (!selectedCourse || course.id !== selectedCourse.id) return course;

                const updatedSubscriptions = course.subscriptions.map((subscription) =>
                    subscription.id === sub.id
                        ? { ...subscription, hasRenewed: !subscription.hasRenewed }
                        : subscription
                );

                return { ...course, subscriptions: updatedSubscriptions };
            })
        );

        setSelectedCourse((prevCourse) => {
            if (!prevCourse) return null;

            const updatedSubscriptions = prevCourse.subscriptions.map((subscription) =>
                subscription.id === sub.id
                    ? { ...subscription, hasRenewed: !subscription.hasRenewed }
                    : subscription
            );

            return { ...prevCourse, subscriptions: updatedSubscriptions };
        });
    }, [selectedCourse]);

    const handleAddCourse = useCallback((newCourse: Course) => {
        newCourse.id = crypto.randomUUID();

        setCourses((prevCourses) => {
            const updatedCourses = [...prevCourses, newCourse];
            setSelectedCourse(newCourse); // ✅ Auto-select new course
            return updatedCourses;
        });

        toast.success('Course added successfully!');
        setShowAddModal(false); // ✅ Close modal on add
    }, []);

    return (
        <div className="p-4">
            <div className="mb-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                    + Add Course
                </button>
            </div>

            <AddCourseModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)} // ✅ Close only via onClose
                onAdd={handleAddCourse}
            />

            <CourseTable
                courses={courses}
                onExtend={handleExtend}
                onCourseClick={handleCourseClick}
            />

            {selectedCourse && (
                <SubscriptionHistory
                    course={selectedCourse}
                    onToggleRenewed={toggleRenewable}
                />
            )}
        </div>
    );
};

export default CourseList;
