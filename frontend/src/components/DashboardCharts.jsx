import { useEffect, useState } from 'react'
import { useTaskStore } from '../store/useTaskStore';
import CustomPieChart from './CustomPieChart';
import CustomBarChart from './CustomBarChart';

const DashboardCharts = ({dashboardData}) => {
    // const [dashboardData, setDashboardData] = useState(null);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const COLORS = ["#B051FF", "#00A89B", "#69c800"];

    // const { adminDashboardData } = useTaskStore();

    const prepareChartData = (data) => {
        const taskDistribution = data?.taskDistribution || null;
        const taskPriorityLevels = data?.taskPriorityLevels || null;

        const taskDistributionData = [
            { status: "Pending", count: taskDistribution?.Pending || 0 },
            { status: "In Progress", count: taskDistribution?.InProgress || 0 },
            { status: "Completed", count: taskDistribution?.Completed || 0 },
        ];

        setPieChartData(taskDistributionData);

        const PriorityLevelData = [
            { priority: "Low", count: taskPriorityLevels?.Low || 0 },
            { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
            { priority: "High", count: taskPriorityLevels?.High || 0 },
        ];

        setBarChartData(PriorityLevelData);
    };

    useEffect(() => {
        const fetchData = async () => {
            // const data = await adminDashboardData();
            // setDashboardData(data);
            // prepareChartData(data?.charts || null);
            prepareChartData(dashboardData?.charts || null);
        };

        fetchData();
    }, [dashboardData])

    return (
        <div className="">
            {/* ✅ Charts Container */}
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                {/* Pie Chart */}
                <div className="flex-1 rounded-lg bg-white shadow-md p-5">
                    <h5 className="text-lg font-semibold mb-3">Task Distribution</h5>
                    <CustomPieChart data={pieChartData} colors={COLORS} />
                </div>

                {/* Bar Chart */}
                <div className="flex-1 rounded-lg bg-white shadow-md p-5">
                    <h5 className="text-lg font-semibold mb-3">Priority Levels</h5>
                    <CustomBarChart data={barChartData} />
                </div>
            </div>
        </div>
    )
}

export default DashboardCharts
