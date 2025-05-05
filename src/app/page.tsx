import { Toaster } from 'react-hot-toast';
import CourseList from './courses/CourseList';

const Page = () => {
    return (
        <div className="p-6 space-y-12">
            <h1 className="text-2xl font-bold">Course Management</h1>
            <div className="flex justify-between items-center">
                <CourseList />
                <Toaster />
            </div>
        </div>
    );
}
export default Page;