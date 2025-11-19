import React from 'react'
import Progress from './Progress'
import { Paperclip } from 'lucide-react'
import AvatarGroup from './AvatarGroup';

const TaskCard = ({title, description, priority, status, progress, createdAt, dueDate, assignedTo, attachmentCount, completedCount, todoCheckList, onclick, key}) => {
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

    const getPriorityBadgeColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-600';
            case 'Medium':
                return 'bg-orange-100 text-orange-600';
            case 'Low':
                return 'bg-green-100 text-green-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <div key={key} onClick={onclick} className='bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition'>
            {/* Status and Priority Badges */}
            <div className="flex gap-2 mb-3">
                <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusBadgeColor(status)}`}>
                    {status}
                </span>
                <span className={`px-3 py-1 rounded text-xs font-medium ${getPriorityBadgeColor(priority)}`}>
                    {priority} Priority
                </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                        Task Done: {completedCount} / {todoCheckList.length}
                    </span>
                </div>
                <Progress progress={progress} status={status} />
            </div>

            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="text-sm font-medium">{formatDate(createdAt)}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p className="text-sm font-medium">{formatDate(dueDate)}</p>
                </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <AvatarGroup avatars={assignedTo} maxVisible={3} />
                {attachmentCount > 0 && (
                    <div className="flex items-center gap-1 text-gray-600">
                        <Paperclip className="size-4" />
                        <span className="text-sm">{attachmentCount}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskCard