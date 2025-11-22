import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader2 } from "lucide-react";
import UserSidebar from "./UserSidebar";

const UserLayout = () => {
  const { isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="size-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Navbar */}
      <div className="flex-shrink-0 bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Content after Navbar */}
      <div className="flex flex-1 pt-12 overflow-hidden">
        
        {/* User Sidebar - handles its own responsive behavior */}
        <UserSidebar />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-[#fafafa]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
