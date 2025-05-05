import { Toaster } from 'react-hot-toast';
import CourseList from './CourseList';

const Page = () => {
    return (
        <div>
            <CourseList />
            <Toaster />
        </div>
    );
}
export default Page;