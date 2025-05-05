import { Toaster } from 'react-hot-toast';
import CourseList from './courses/CourseList';

const Page = () => {
    return (
        <div>
            <CourseList />
            <Toaster />
        </div>
    );
}
export default Page;