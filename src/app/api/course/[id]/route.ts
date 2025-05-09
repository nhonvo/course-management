import { readData, writeData } from '@/app/lib/file-utils';
import { Course } from '@/app/models/Course';
import { NextRequest, NextResponse } from 'next/server';

// UPDATE a course
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const updatedCourse = await req.json();
        const courses: Course[] = await readData();

        const index = courses.findIndex(c => c.id === id);
        if (index === -1) return NextResponse.json({ message: 'Course not found' }, { status: 404 });

        courses[index] = { ...courses[index], ...updatedCourse };
        await writeData(courses);

        return NextResponse.json(courses[index]);
    } catch {
        return NextResponse.json({ message: 'Failed to update course.' }, { status: 500 });
    }
}

// DELETE a course
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        const courses: Course[] = await readData();
        const updatedCourses = courses.filter(c => c.id !== id);

        if (courses.length === updatedCourses.length) {
            return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        }

        await writeData(updatedCourses);
        return NextResponse.json({ message: 'Course deleted' });
    } catch {
        return NextResponse.json({ message: 'Failed to delete course.' }, { status: 500 });
    }
}
