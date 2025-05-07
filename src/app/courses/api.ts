import { Course } from "../models/Course";

export async function getAllCourses(): Promise<Course[]> {
    const res = await fetch('/api/courses');
    if (!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
}

export async function createCourse(newCourse: Omit<Course, 'id'>): Promise<Course> {
    const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
    });

    if (!res.ok) throw new Error('Failed to create course');
    return res.json();
}
