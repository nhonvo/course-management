'use client';
import { format } from 'date-fns';
import { useState } from 'react';
import { Course } from './models/Course';

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      name: 'Math 101',
      teacher: 'Mr. John',
      subscriptions: [
        { id: '1', month: '2025-04', expiryDate: '2025-04-30', hasRenewed: false },
        { id: '2', month: '2025-05', expiryDate: '2025-05-4', hasRenewed: false },
      ],
    },
    // More courses...
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const handleExtend = (id: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== id || course.subscriptions.some((sub) => sub.hasRenewed)) return course;

        const lastSubscription = course.subscriptions[course.subscriptions.length - 1];
        const lastExpiryDate = new Date(lastSubscription.expiryDate);
        const newExpiryDate = new Date(lastExpiryDate);
        newExpiryDate.setMonth(lastExpiryDate.getMonth() + 1);

        const newSubscription = {
          id: crypto.randomUUID(), // ✅ ensure the ID is present
          month: format(newExpiryDate, 'yyyy-MM'),
          expiryDate: format(newExpiryDate, 'yyyy-MM-dd'),
          hasRenewed: true,
        };

        return {
          ...course,
          subscriptions: [...course.subscriptions, newSubscription],
        };
      })
    );
  };

  const isNearlyExpired = (expiryDate: string) => {
    const now = new Date();
    const expirationDate = new Date(expiryDate);
    const diffDays = (expirationDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
    return diffDays <= 7; // Course expires within the next 7 days
  };

  const handleCourseClick = (course: Course) => setSelectedCourse(course);

  const toggleRenewable = (sub: { id: string; hasRenewed: boolean }) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (!selectedCourse || course.id !== selectedCourse.id) return course;

        const updatedSubscriptions = course.subscriptions.map((subscription) =>
          subscription.id === sub.id
            ? { ...subscription, hasRenewed: !subscription.hasRenewed }
            : subscription
        );

        return { ...course, subscriptions: updatedSubscriptions };
      })
    );

    setSelectedCourse((prevCourse) => {
      if (!prevCourse) return null;

      const updatedSubscriptions = prevCourse.subscriptions.map((subscription) =>
        subscription.id === sub.id
          ? { ...subscription, hasRenewed: !subscription.hasRenewed }
          : subscription
      );

      return { ...prevCourse, subscriptions: updatedSubscriptions };
    });
  };


  return (
    <div>
      {/* Main Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Course Name</th>
            <th className="px-4 py-2">Teacher</th>
            <th className="px-4 py-2">Expiry Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const latestSub = course.subscriptions.at(-1);
            const shouldShowExtend = latestSub && isNearlyExpired(latestSub.expiryDate) && !course.subscriptions.some(s => s.hasRenewed);
            return (
              <tr key={course.id} onClick={() => handleCourseClick(course)}>
                <td className="border px-4 py-2">{course.name}</td>
                <td className="border px-4 py-2">{course.teacher}</td>
                <td className="border px-4 py-2">{latestSub?.expiryDate ?? 'N/A'}</td>
                <td className="border px-4 py-2">
                  {shouldShowExtend && (
                    <button onClick={(e) => {
                      e.stopPropagation();
                      handleExtend(course.id);
                    }}
                      className="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded"
                    >
                      Extend
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Subscription History Subtable */}
      {selectedCourse && (
        <div className="mt-4">
          <h3>Subscription History for {selectedCourse.name}</h3>
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Month</th>
                <th className="px-4 py-2">Expiry Date</th>
                <th className="px-4 py-2">Renewed</th>
              </tr>
            </thead>
            <tbody>
              {selectedCourse.subscriptions.map((sub) => (
                <tr key={sub.id}>
                  <td className="border px-4 py-2">{sub.month}</td>
                  <td className="border px-4 py-2">{sub.expiryDate}</td>
                  <td className="border px-4 py-2">
                    {/* Toggle renewable status for each subscription */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRenewable(sub);
                      }}
                      className={`px-2 py-1 rounded ${sub.hasRenewed ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                      {sub.hasRenewed ? 'Renewed' : 'Not Renewed'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseList;
