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
        <div className="flex-1 bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                    {getGreeting()}! <span className="text-blue-600">{authUser?.fullName.split(" ")[0]}</span>
                </h1>
                <p className="text-xs md:text-xs text-gray-400">
                    {getFormattedDate()}
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {taskStats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-3 px-2 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                    >
                        <div
                            className="w-2 h-6 rounded-full"
                            style={{ backgroundColor: stat.color }}
                        ></div>

                        <div className="leading-tight md:flex justify-center items-center gap-2">
                            <span className="block text:sm md:text-lg font-bold">{stat.count}</span>
                            <span className="text-gray-500 text-xs md:text-sm">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SummaryCard;
