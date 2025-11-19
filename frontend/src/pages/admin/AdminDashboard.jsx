import { useEffect, useState } from 'react';
import DashboardCharts from '../../components/DashboardCharts'
import SummaryCard from '../../components/SummaryCard'
import TaskListTable from '../../components/TaskListTable'
import { useTaskStore } from '../../store/useTaskStore';
import { Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { adminDashboardData, loading } = useTaskStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await adminDashboardData();
      setDashboardData(data);
      console.log("Dashboard Data:", data);
    };

    fetchData();
  }, []);
  
  if(loading || !dashboardData){
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className='size-10 animate-spin text-blue-600' />
      </div>
    )
  }
  return (
    <div className='bg-[#fafafa] min-h-screen'>
      <div className="p-5">
        <SummaryCard statistics={dashboardData?.statistics}/>
      </div>
      <div className="p-5">
        <DashboardCharts dashboardData={dashboardData}/>
      </div>
      <div className=" bg-white rounded-md p-5 m-5 shadow-md">
        <TaskListTable tableData={dashboardData?.recentTasks}/>
      </div>
    </div>
  )
}

export default AdminDashboard
