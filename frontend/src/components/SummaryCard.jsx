import { useAuthStore } from "../store/useAuthStore";

const SummaryCard = ({ statistics }) => {
    const taskStats = [
        { count: statistics?.totalTasks, label: "Total Tasks", color: "#3b82f6" },
        { count: statistics?.pendingTasks, label: "Pending Tasks", color: "#8b5cf6" },
        { count: statistics?.overdueTasks, label: "In Progress Tasks", color: "#06b6d4" },
        { count: statistics?.completedTasks, label: "Completed Tasks", color: "#22c55e" },
    ];

    const { authUser } = useAuthStore();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        else if (hour < 18) return "Good Afternoon";
        else return "Good Evening";
    };

    const getFormattedDate = () => {
        const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
        return new Date().toLocaleDateString(undefined, options);
    };


    return (
        <div className='flex-1 bg-white rounded-md p-5 shadow-md'>
            <div className="">
                <div className="">
                    <h1 className='text-2xl font-bold'>{getGreeting()}! {authUser?.fullName.split(" ")[0]}</h1>
                    <p className="text-xs text-gray-400">{getFormattedDate()}</p>
                </div>
                <div className="flex justify-between mt-5">
                    {taskStats.map((stat, index) => (
                        <div key={index} className="flex items-center space-x-2 text-gray-800">
                            <div className="w-2 h-4 rounded-full" style={{ backgroundColor: stat.color }}></div>
                            <div className="font-semibold text-sm">
                                <span className="font-bold">{stat.count}</span>
                                <span className="ml-1 text-gray-400">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SummaryCard
