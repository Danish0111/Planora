import React, { useEffect, useState } from 'react'
import UserCard from '../../components/UserCard'
import { axiosInstance } from '../../utils/axios';
import { FileSpreadsheet, Loader2 } from 'lucide-react';

const TeamMembers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users");
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get('/reports/export/users', {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users_report.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report. Please try again later.");
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className='size-10 animate-spin text-blue-600' />
      </div>
    )
  }
  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-semibold p-2">Team Members</h1>
        <button type="button" onClick={()=> handleDownloadReport()} className='flex justify-center items-center gap-2 font-medium bg-[#dbfd9c] p-2 rounded-lg text-sm border border-[#bef852] hover:cursor-pointer'>
          <FileSpreadsheet className='size-5' />
          <p className="">Download Report</p>
        </button>
      </div>
      <div className="grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-6 gap-4 mb-6">
        {allUsers.map((user, index) => (
          <UserCard key={user._id} userInfo={user} />
        ))}
      </div>
    </div>
  )
}

export default TeamMembers
