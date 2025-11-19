import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { useAuthStore } from '../../store/useAuthStore'
import { Loader2 } from 'lucide-react'
import UserSidebar from './UserSidebar'

const UserLayout = () => {
    const { isCheckingAuth } = useAuthStore();
    {
        if (isCheckingAuth) {
            return (
                <div className="flex h-screen justify-center items-center">
                    <Loader2 className='size-10 animate-spin text-blue-600' />
                </div>
            )
        }
    }
    return (
        <div className="h-screen flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-50 bg-white">
                <Navbar />
            </div>
            <div className="flex flex-1">
                <div className="fixed top-12 left-0 w-64 border-r border-gray-200 bg-white">
                    <UserSidebar />
                </div>
                <div className="ml-64 flex-1 overflow-y-auto pt-12 bg-[#fafafa] min-h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserLayout
