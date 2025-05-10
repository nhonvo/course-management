"use client";
import AddCourseModal from "../components/AddCourseModal";
import { Plus } from "lucide-react";
import CourseTable from "../components/CourseTable";
import { useCourses } from "../hooks/useCourses";
import { Button } from "src/shared/components/ui/button";

const CourseList = () => {
    const { courses, showAddModal,
        handleAddCourse,
        handleAddSubscription,
        handleRemoveSubscription,
        handleUpdateSubscriptionStatus,
        handleDeleteCourse,
        setShowAddModal } = useCourses();

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
