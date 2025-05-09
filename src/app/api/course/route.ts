import { readData, writeData } from '@/app/lib/file-utils';
import { Course } from '@/app/models/Course';
import { Subscription } from '@/app/models/Subscription';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const courses: Course[] = await readData();
        return NextResponse.json(courses);
    } catch {
        return NextResponse.json({ message: 'Failed to load courses.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const newCourse: Course = await req.json();
        const courses: Course[] = await readData();

        const courseId = crypto.randomUUID();

        // Create subscription with generated ID
        const initialSubscription: Subscription = {
            id: crypto.randomUUID(),
            expiryDate: newCourse.subscriptions[0].expiryDate,      // should come from form
            hasRenewed: newCourse.subscriptions[0].hasRenewed ?? false,
        };

        const courseWithId: Course = {
            id: courseId,
            name: newCourse.name,
            teacher: newCourse.teacher,
            subscriptions: [initialSubscription],
        };

        courses.push(courseWithId);
        await writeData(courses);

        return NextResponse.json(courseWithId, { status: 201 });
    } catch (error) {
        console.error("Error adding course:", error);
        return NextResponse.json({ message: 'Failed to add course.' }, { status: 500 });
    }
}
