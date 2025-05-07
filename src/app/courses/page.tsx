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
// import { getAllCourses } from "./api";


const CourseList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);

    // Load initial data

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("data/courses.json");
                const data = await res.json();
                setCourses(data);
            } catch {
                toast.error('Failed to load courses.');
            }
        };
        fetchCourses();
    }, []);

    const handleAddCourse = useCallback((newCourse: Course) => {
        const courseWithId = {
            ...newCourse,
            id: crypto.randomUUID(),
        };

        setCourses(prev => [...prev, courseWithId]);
        setShowAddModal(false);
        showCourseAdded(newCourse.name);
    }, []);

    const handleAddSubscription = (courseId: string, newSubscription: Subscription) => {
        // Find the course with the given courseId
        const updatedCourses = courses.map(course => {
            if (course.id === courseId) {
                // Update the course by adding the new subscription
                return {
                    ...course,
                    subscriptions: [...course.subscriptions, newSubscription], // Add new subscription
                };
            }
            return course;
        });

        // Update state (assuming `setCourses` is the state setter function)
        setCourses(updatedCourses);

        // Show toast notification
        toast(`Added subscription to course ${courseId}`, newSubscription);
    };

    const handleRemoveSubscription = (courseId: string, subscriptionId: string) => {
        // Remove subscription from the specific course
        const updatedCourses = courses.map(course => {
            if (course.id === courseId) {
                // Remove the subscription with the given subscriptionId
                return {
                    ...course,
                    subscriptions: course.subscriptions.filter(sub => sub.id !== subscriptionId),
                };
            }
            return course;
        });

        // Update state (assuming `setCourses` is the state setter function)
        setCourses(updatedCourses);

        // Show toast notification
        toast(`Removed subscription ${subscriptionId} from course ${courseId}`);
    };

    const handleUpdateSubscriptionStatus = (courseId: string, subscriptionId: string) => {
        // Update the subscription status (for example, toggle the `hasRenewed` status)
        const updatedCourses = courses.map(course => {
            if (course.id === courseId) {
                return {
                    ...course,
                    subscriptions: course.subscriptions.map(sub => {
                        if (sub.id === subscriptionId) {
                            // Toggle subscription renewal status
                            return { ...sub, hasRenewed: !sub.hasRenewed };
                        }
                        return sub;
                    }),
                };
            }
            return course;
        });

        // Update state (assuming `setCourses` is the state setter function)
        setCourses(updatedCourses);

        // Show toast notification
        toast(`Updated subscription status for course ${courseId}, subscription ${subscriptionId}`);
    };

    const handleDeleteCourse = async (courseId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this course?");
        if (!confirmed) return;

        const updatedCourses = courses.filter(course => course.id !== courseId);
        setCourses(updatedCourses);
        showCourseDeleted(courseId)
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
