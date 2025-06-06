import { useEffect, useState, useCallback } from "react";
import { Course1 } from '../../../models/Course';
import toast from "react-hot-toast";
import { Subscription } from "../../../models/Subscription";
import { showCourseAdded, showCourseDeleted } from "src/shared/toastService";

export function useCourses() {
    const [courses, setCourses] = useState<Course1[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchCourses = async () => {
        try {
            const res = await fetch("/api/course");
            const data = await res.json();
            setCourses(data);
        } catch {
            toast.error('Failed to load courses.');
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    const handleAddCourse = useCallback(async (newCourse: Course1) => {
        try {
            const res = await fetch('/api/course', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCourse),
            });

            if (!res.ok) throw new Error();

            const created = await res.json();
            setCourses(prev => [...prev, created]);
            setShowAddModal(false);
            showCourseAdded(created.name);
        } catch {
            toast.error('Failed to add course.');
        }
    }, []);

    const handleAddSubscription = async (courseId: string, newSubscription: Subscription) => {
        const updatedCourses = courses.map(course => {
            if (course.id === courseId) {
                return {
                    ...course,
                    subscriptions: [...course.subscriptions, newSubscription],
                };
            }
            return course;
        });

        setCourses(updatedCourses);

        try {
            await fetch(`/api/course/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subscriptions: updatedCourses.find(c => c.id === courseId)?.subscriptions,
                }),
            });
            toast.success(`Added subscription to course ${courseId}`);
        } catch {
            toast.error('Failed to add subscription.');
        }
    };

    const handleRemoveSubscription = async (courseId: string, subscriptionId: string) => {
        const updatedCourses = courses.map(course => {
            if (course.id === courseId) {
                return {
                    ...course,
                    subscriptions: course.subscriptions.filter(sub => sub.id !== subscriptionId),
                };
            }
            return course;
        });

        setCourses(updatedCourses);

        try {
            await fetch(`/api/course/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subscriptions: updatedCourses.find(c => c.id === courseId)?.subscriptions,
                }),
            });
            toast.success(`Removed subscription ${subscriptionId} from course ${courseId}`);
        } catch {
            toast.error('Failed to remove subscription.');
        }
    };

    const handleUpdateSubscriptionStatus = async (courseId: string, subscriptionId: string) => {
        const updatedCourses = courses.map(course => {
            if (course.id === courseId) {
                return {
                    ...course,
                    subscriptions: course.subscriptions.map(sub => {
                        if (sub.id === subscriptionId) {
                            return { ...sub, hasRenewed: !sub.hasRenewed };
                        }
                        return sub;
                    }),
                };
            }
            return course;
        });

        setCourses(updatedCourses);

        try {
            await fetch(`/api/course/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subscriptions: updatedCourses.find(c => c.id === courseId)?.subscriptions,
                }),
            });
            toast.success(`Updated subscription status for ${subscriptionId}`);
        } catch {
            toast.error('Failed to update subscription status.');
        }
    };
    const handleDeleteCourse = async (courseId: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this course?');
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/course/${courseId}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();

            showCourseDeleted(courseId);
            setCourses(prev => prev.filter(course => course._id !== courseId));

        } catch {
            toast.error('Failed to delete course.');
        }
    };

    return {
        courses,
        showAddModal,
        setShowAddModal,
        handleAddCourse,
        handleAddSubscription,
        handleRemoveSubscription,
        handleUpdateSubscriptionStatus,
        handleDeleteCourse,
        refetch: fetchCourses,
    };
}
