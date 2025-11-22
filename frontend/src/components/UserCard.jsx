import { User } from "lucide-react";

const UserCard = ({ userInfo }) => {
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-600';
            case 'In Progress':
                return 'bg-cyan-100 text-cyan-600';
            default:
                return 'bg-purple-100 text-purple-600';
        }
    };

    return (
        <div className="bg-white w-full rounded-xl shadow-sm p-2 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
                {
                    userInfo.profileImageUrl !== null ? (
                        <img src={userInfo.profileImageUrl} className='size-6 rounded-full border border-white' alt="" />
                    ) : (
                        <User className="size-8 md:size-10 rounded-full bg-gray-300 p-1.5" />
                    )
                }
                <div>
                    <h3 className="max-md:text-sm font-semibold text-gray-900">{userInfo?.fullName}</h3>
                    <p className="text-xs md:text-sm text-gray-500">{userInfo?.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className={`p-1 md:p-2 rounded-lg text-center md:text-left ${getStatusBadgeColor('Pending')}`}>
                    <div className='font-semibold max-md:text-sm md:font-bold'>
                        {userInfo?.stats?.pending || 0}
                    </div>
                    <div className="text-xs text-purple-600">Pending</div>
                </div>

                <div className={`p-1 md:p-2 rounded-lg text-center md:text-left ${getStatusBadgeColor('In Progress')}`}>
                    <div className='font-semibold max-md:text-sm md:font-bold'>
                        {userInfo?.stats?.inProgress || 0}
                    </div>
                    <div className="text-xs text-cyan-600">In Progress</div>
                </div>

                <div className={`p-1 md:p-2 rounded-lg text-center md:text-left ${getStatusBadgeColor('Completed')}`}>
                    <div className='font-semibold max-md:text-sm md:font-bold'>
                        {userInfo?.stats?.completed || 0}
                    </div>
                    <div className="text-xs text-green-600">Completed</div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
