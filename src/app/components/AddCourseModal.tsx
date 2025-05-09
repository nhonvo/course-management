'use client';

import { useState } from 'react';
import { Button } from "@/app/shared/components/ui/button";
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from '@/app/shared/components/ui/dialog';
import { Input } from '@/app/shared/components/ui/input';
import {  Course1 } from '@/app/models/Course';
import { Subscription } from '../models/Subscription';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (course: Course1) => void;
};

const AddCourseModal = ({ isOpen, onClose, onAdd }: Props) => {
    const [courseName, setCourseName] = useState('');
    const [teacher, setTeacher] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const handleAdd = () => {
        if (!courseName.trim() || !teacher.trim()) {
            toast.error('Course name and teacher are required');
            return;
        }

        if (!expiryDate) {
            toast.error('Subscription expiry date is required');
            return;
        }

        const newSubscription: Subscription = {
            id: crypto.randomUUID(),
            expiryDate,
            hasRenewed: true,
        };

        const newCourse: Course1 = {
            id: crypto.randomUUID(),
            name: courseName,
            teacher,
            subscriptions: [newSubscription],
        };

        try {
            onAdd(newCourse);
            toast.success('Course added!');
            onClose(); // Close the modal
            setCourseName('');
            setTeacher('');
            setExpiryDate('');
        } catch {
            toast.error('Failed to add course');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-lg p-6 shadow-lg transition-all duration-300">
                <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Course name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        aria-label="Course Name"
                    />
                    <Input
                        placeholder="Teacher name"
                        value={teacher}
                        onChange={(e) => setTeacher(e.target.value)}
                        aria-label="Teacher Name"
                    />
                    <Input
                        type="date"
                        placeholder="Expiry date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        aria-label="Expiry Date"
                    />
                </div>
                <DialogFooter className="flex justify-between gap-4">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add Course</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddCourseModal;
