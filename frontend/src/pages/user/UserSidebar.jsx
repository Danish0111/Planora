import { LayoutDashboardIcon, ListIcon, LogOut, PlusSquareIcon, User, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore';

const UserSidebar = () => {
    const userNavlinks = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboardIcon },
        { name: 'My Tasks', path: '/my-tasks', icon: ListIcon },
    ]

    const { authUser, logout } = useAuthStore();
    const handleLogout = () => {
        logout();
    }
    return (
        <div className='border-r border-gray-200 min-h-screen'>
            <div className="">
                <div className="p-4">
                    <div className="flex flex-col items-center justify-center p-4">
                        {authUser?.profileImageUrl ? (
                            <img className='size-20 rounded-full p-2' src={authUser?.profileImageUrl} alt="" />
                        ) : (
                            <User className='size-20 rounded-full p-2 bg-gray-500 ' />
                        )}
                        <div className="bg-blue-600 rounded p-0.5 px-2 text-xs text-white mt-0.5">{authUser?.role}</div>
                        <div className=" font-bold mt-2">{authUser?.fullName}</div>
                        <div className="text-sm text-gray-500">{authUser?.email}</div>
                    </div>
                </div>
                <div className="">
                    {userNavlinks.map((link, index) => (
                        <NavLink key={index} to={link.path} className={({ isActive }) => `flex items-center max-md:justify-center gap-2 py-2.5 pl-6 first:mt-6 text-gray-400 ${!isActive && 'hover:bg-gray-100'} relative w-full ${isActive && 'bg-blue-600/15 text-blue-600 group transition'}`}>
                            {({ isActive }) => (
                                <>
                                    <link.icon className={`size-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                    <span className={`max-md:hidden ${isActive && 'text-blue-600'}`}>{link.name}</span>
                                    <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-blue-600 transition'}`}></span>
                                </>
                            )}
                        </NavLink>
                    ))}
                    <div onClick={handleLogout} className="flex items-center max-md:justify-center gap-2 py-2.5 pl-6 first:mt-6 w-full hover:bg-gray-100 hover:cursor-pointer">
                        <LogOut className='text-gray-400' />
                        <span className=" text-gray-400">Logout</span>
                    </div>
                </div>
            </div>
            <div className=""></div>
        </div>
    )
}

export default UserSidebar
