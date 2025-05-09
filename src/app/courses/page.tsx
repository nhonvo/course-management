"use client";
import { useEffect, useState, useCallback } from "react";
import { Course } from '../models/Course';
import toast from "react-hot-toast";
import AddCourseModal from "../components/AddCourseModal";
import { Subscription } from "../models/Subscription";
import { Button } from "../shared/components/ui/button";
import { Plus } from "lucide-react";
import { showCourseAdded, showCourseDeleted } from "../shared/toastService";
import CourseTable from "../components/CourseTable";

const CourseList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);

    // Load initial data
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("/api/course");
                const data = await res.json();
                setCourses(data);
            } catch {
                toast.error('Failed to load courses.');
            }
        };
        fetchCourses();
    }, []);

    const handleAddCourse = useCallback(async (newCourse: Course) => {
        try {
            // console.log("here")
            // console.log(newCourse.subscriptions[0].expiryDate)
            // console.log(newCourse.subscriptions[0].id)
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

            setCourses(prev => prev.filter(course => course.id !== courseId));
            showCourseDeleted(courseId);
        } catch {
            toast.error('Failed to delete course.');
        }
    };

    return (
        <div className="p-4 h-screen w-screen">
            <div className="mb-4">
                <Button onClick={() => setShowAddModal(true)}>
                    <Plus size={16} /> Add Course
                </Button>
            </div>

            <AddCourseModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddCourse}
            />

            <CourseTable
                courses={courses}
                onAddSubscription={handleAddSubscription}
                onRemoveSubscription={handleRemoveSubscription}
                onUpdateSubscriptionStatus={handleUpdateSubscriptionStatus}
                onDeleteCourse={handleDeleteCourse}
            />
        </div>
    );
};

export default CourseList;
