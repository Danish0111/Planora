import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../../store/useTaskStore';
import TaskStatusTabs from '../../components/TaskStatusTabs';
import { File, FileSpreadsheet, Loader2 } from 'lucide-react';
import TaskCard from '../../components/TaskCard';
import { axiosInstance } from '../../utils/axios';
import toast from 'react-hot-toast';


const ManageTasks = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const { tasks, loading, fetchTasks, statusTabs } = useTaskStore();

  const handleClick = (taskData) => {
    console.log("=== CLICK HANDLER FIRED ===");
    console.log("Task Data:", taskData);
    console.log("Task ID:", taskData._id);
    console.log("About to navigate to: /create-tasks");
    navigate('/admin/create-tasks', { state: { taskId: taskData._id } });
    console.log("Navigate called");
  }

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get('/reports/export/tasks', {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'tasks_report.xlsx');
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
    fetchTasks(filterStatus);
    console.log("Tasks Data:", tasks);
    return () => { };
  }, [filterStatus]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className='size-10 animate-spin text-blue-600' />
      </div>
    )
  }
  return (
    <div>
      <div className="flex flex-col p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold p-2">My Tasks</h1>
          <div className="flex justify-center items-center gap-4">
            <div className="hidden min-lg:block">
              <TaskStatusTabs tabs={statusTabs} activeTab={filterStatus} setActiveTab={setFilterStatus} />
            </div>
            <button type="button" onClick={() => handleDownloadReport()} className='flex justify-center items-center gap-2 font-medium bg-[#dbfd9c] p-2 rounded-lg text-sm border border-[#bef852] hover:cursor-pointer'>
              <FileSpreadsheet className='size-5' />
              <p className="hidden md:block">Download Report</p>
            </button>
          </div>
        </div>
        <div className="min-lg:hidden">
          <TaskStatusTabs tabs={statusTabs} activeTab={filterStatus} setActiveTab={setFilterStatus} />
        </div>
      </div>
      <div className="grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-6 gap-4 mb-6">
        {tasks.map((item, index) => (
          <TaskCard
            key={item._id}
            title={item.title}
            description={item.description}
            priority={item.priority}
            status={item.status}
            progress={item.progress}
            createdAt={item.createdAt}
            dueDate={item.dueDate}
            assignedTo={item.assignedTo?.map((item) => item.profileImageUrl || 'none') || []}
            attachmentCount={item.attachments?.length || 0}
            completedCount={item.completedTodoCount || 0}
            todoCheckList={item.todoChecklist || []}
            onclick={() => handleClick(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default ManageTasks
