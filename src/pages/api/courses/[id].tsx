import React, { useEffect, useState } from 'react'; // Add this import
import { GetServerSideProps } from 'next';

interface Subscription {
    id: string;
    expiryDate: string;
    hasRenewed: boolean;
}

interface Course {
    id: string;
    name: string;
    teacher: string;
    subscriptions: Subscription[];
}

interface CoursePageProps {
    course: Course;
}

const CoursePage = ({ course }: CoursePageProps) => {
    const [courseData] = useState(course);

    useEffect(() => {
        // You can add client-side logic if needed
    }, []);

    return (
        <div>
            <h1>{courseData.name}</h1>
            <p>Teacher: {courseData.teacher}</p>
            <h2>Subscriptions</h2>
            <ul>
                {courseData.subscriptions.map((sub) => (
                    <li key={sub.id}>
                        <p>Expiry Date: {sub.expiryDate}</p>
                        <p>Has Renewed: {sub.hasRenewed ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const res = await fetch(`https://localhost:3000/api/courses/${params?.id}`);
    const course = await res.json();

    return { props: { course } };
};

export default CoursePage;
