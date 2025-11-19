import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import Navbar from '../../components/Navbar'
import { useAuthStore } from '../../store/useAuthStore'
import { Loader2 } from 'lucide-react'

const Layout = () => {
    const { isCheckingAuth } = useAuthStore()
    
    if (isCheckingAuth) {
        return (
            <div className="flex h-screen justify-center items-center">
                <Loader2 className='w-10 h-10 animate-spin text-blue-600' />
            </div>
        )
    }
    
    return (
        <div className="h-screen flex flex-col">
            {/* Fixed Navbar */}
            <div className="flex-shrink-0 bg-white shadow-sm border-b border-gray-200">
                <Navbar />
            </div>
            
            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - handled internally with responsive behavior */}
                <AdminSidebar />
                
                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout