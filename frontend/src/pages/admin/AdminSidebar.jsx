import { LayoutDashboard, List, PlusSquare, User, Users, LogOut, Menu, X, ListCollapse, ChevronLeft } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'

const AdminSidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const adminNavlinks = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
        { name: 'Manage Tasks', path: '/admin/manage-tasks', icon: List },
        { name: 'Create Tasks', path: '/admin/create-tasks', icon: PlusSquare },
        { name: 'Team Members', path: '/admin/team-members', icon: Users },
    ]

    const { authUser, logout } = useAuthStore()

    const handleLogout = () => {
        logout()
        setIsMobileMenuOpen(false)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const SidebarContent = () => (
        <>
            <div className="p-4">
                <div className="flex flex-col items-center justify-center pt-16 md:p-4">
                    {authUser?.profileImageUrl ? (
                        <img className='w-16 h-16 md:w-20 md:h-20 rounded-full object-cover' src={authUser?.profileImageUrl} alt="Profile" />
                    ) : (
                        <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-500 flex items-center justify-center'>
                            <User className='w-10 h-10 md:w-12 md:h-12 text-white' />
                        </div>
                    )}
                    <div className="bg-blue-600 rounded px-2 py-1 text-xs text-white mt-2">{authUser?.role}</div>
                    <div className="font-bold mt-2 text-center text-sm md:text-base">{authUser?.fullName}</div>
                    <div className="text-xs md:text-sm text-gray-500 text-center break-all px-2">{authUser?.email}</div>
                </div>
            </div>

            <nav className="mt-4">
                {adminNavlinks.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.path}
                        end={link.end}
                        onClick={closeMobileMenu}
                        className={({ isActive }) => `
                            flex items-center gap-3 py-3 px-6
                            text-gray-600 transition-all duration-200
                            ${!isActive && 'hover:bg-gray-100'}
                            ${isActive && 'bg-blue-600/10 text-blue-600'}
                            relative group
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <link.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                <span className={`font-medium ${isActive && 'text-blue-600'}`}>{link.name}</span>
                                <span className={`
                                    w-1 h-10 rounded-l absolute right-0
                                    transition-all duration-200
                                    ${isActive ? 'bg-blue-600 opacity-100' : 'opacity-0'}
                                `}></span>
                            </>
                        )}
                    </NavLink>
                ))}

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-3 px-6 w-full text-left text-gray-600 hover:bg-gray-100 transition-all duration-200"
                >
                    <LogOut className='w-5 h-5 text-gray-400 flex-shrink-0' />
                    <span className="font-medium">Logout</span>
                </button>
            </nav>
        </>
    )

    return (
        <>
            {/* Mobile Menu Button */}
            {!isMobileMenuOpen && (
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden fixed top-10 left-0 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
                    aria-label="Toggle menu"
                >
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>
            )}

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static top-0 bottom-0 left-0 z-40
                w-72 bg-white border-r border-gray-200
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                flex flex-col overflow-y-auto
            `}>
                <SidebarContent />
                {isMobileMenuOpen && (
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden fixed top-12 right-0 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
                        aria-label="Toggle menu"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                )}
            </aside>
        </>
    )
}

export default AdminSidebar