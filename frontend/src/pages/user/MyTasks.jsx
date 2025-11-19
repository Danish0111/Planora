import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../../store/useTaskStore';
import TaskStatusTabs from '../../components/TaskStatusTabs';
import { File, FileSpreadsheet, Loader2 } from 'lucide-react';
import TaskCard from '../../components/TaskCard';
import { axiosInstance } from '../../utils/axios';
import toast from 'react-hot-toast';


const MyTasks = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  const { tasks, loading, fetchTasks, statusTabs } = useTaskStore();

  const handleClick = (taskId) => {
    // console.log("=== CLICK HANDLER FIRED ===");
    // console.log("Task Data:", taskData);
    // console.log("Task ID:", taskData._id);
    // console.log("About to navigate to: /create-tasks");
    navigate(`/task-details/${taskId}`);
    // console.log("Navigate called");
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
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-semibold p-2">My Tasks</h1>
        <div className="flex justify-center items-center gap-4">
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
            onclick={() => handleClick(item._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default MyTasks
