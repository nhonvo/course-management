import { Toaster } from 'react-hot-toast';
import Dashboard from 'src/features/transactions/pages';

const Page = () => {
    return (
        <>
            <Dashboard />
            <Toaster />
        </>
    );
}
export default Page;