import { NextRequest, NextResponse } from 'next/server';
import { Course } from '@/app/models/Course';
import { connectToDatabase } from '@/app/lib/db/mongodb';
import { isValidObjectId } from 'mongoose';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const update = await req.json();

        const course = await Course.findByIdAndUpdate(id, update, { new: true });
        if (!course) return NextResponse.json({ message: 'Course not found' }, { status: 404 });

        return NextResponse.json(course);
    } catch (error) {
        console.error("Error updating course:", error);
        return NextResponse.json({ message: 'Failed to update course.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!isValidObjectId(id)) {
            return NextResponse.json({ message: 'Invalid course ID' }, { status: 400 });
        }

        await connectToDatabase();
        const deleted = await Course.findByIdAndDelete(id);

        if (!deleted) return NextResponse.json({ message: 'Course not found' }, { status: 404 });

        return NextResponse.json({ message: 'Course deleted' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Failed to delete course.' }, { status: 500 });
    }
}
