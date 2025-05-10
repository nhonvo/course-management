import { Toaster } from 'react-hot-toast';
import Home from 'src/features/transactions/pages';

const Page = () => {
    return (
        <div className="p-6 space-y-12">
            <h1 className="text-2xl font-bold">Finance Dashboard</h1>
            <div className="flex justify-between items-center">
                <Home />
                <Toaster />
            </div>
        </div>
    );
}
export default Page;