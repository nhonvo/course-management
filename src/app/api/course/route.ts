import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db/mongodb';
import { Course } from '@/app/models/Course';

export async function GET() {
    try {
        await connectToDatabase();
        const courses = await Course.find();
        console.log(courses)
        return NextResponse.json(courses);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to load courses.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const data = await req.json();

        const course = await Course.create({
            name: data.name,
            teacher: data.teacher,
            subscriptions: [{
                id: crypto.randomUUID(),
                expiryDate: data.subscriptions[0].expiryDate,
                hasRenewed: data.subscriptions[0].hasRenewed ?? false
            }]
        });

        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        console.error("Error adding course:", error);
        return NextResponse.json({ message: 'Failed to add course.' }, { status: 500 });
    }
}
