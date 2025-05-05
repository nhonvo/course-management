'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';
import { Course } from '../models/Course';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Subscription } from '../models/Subscription';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (course: Course) => void;
};

const AddCourseModal = ({ isOpen, onClose, onAdd }: Props) => {
    const [courseName, setCourseName] = useState('abcd');
    const [teacher, setTeacher] = useState('abcd');
    const [expiryDate, setExpiryDate] = useState('');

    const handleAdd = () => {
        if (!courseName.trim() || !teacher.trim()) {
            toast.error('Course name and teacher are required');
            return;
        }

        if (!expiryDate) {
            toast.error('Subscription expiry date are required');
            return;
        }

        const newSubscription: Subscription = {
            id: crypto.randomUUID(),
            expiryDate,
            hasRenewed: true,
        };

        const newCourse: Course = {
            id: crypto.randomUUID(),
            name: courseName,
            teacher,
            subscriptions: [newSubscription],
        };

        onAdd(newCourse);
        toast.success('Course added!');
        onClose();
        setCourseName('');
        setTeacher('');
        setExpiryDate('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Course name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                    <Input
                        placeholder="Teacher name"
                        value={teacher}
                        onChange={(e) => setTeacher(e.target.value)}
                    />
                    <Input
                        type="date"
                        placeholder="Expiry date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add Course</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddCourseModal;
