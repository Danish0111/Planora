import { ArrowRight } from 'lucide-react';
import React from 'react'
import { formatDate } from '../utils/formatDate';
import { useNavigate } from 'react-router-dom';

const TaskListTable = ({ tableData }) => {
    const navigate = useNavigate();

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-500 border border-green-200';
            case 'Pending':
                return 'bg-purple-100 text-purple-500 border border-purple-200';
            case 'In Progress':
                return 'bg-cyan-100 text-cyan-500 border border-cyan-200';
            default:
                return 'bg-gray-100 text-gray-500 border border-gray-200';
        }
    };

    const getPriorityBadgeColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-500 border border-red-200';
            case 'Medium':
                return 'bg-orange-100 text-orange-500 border border-orange-200';
            case 'Low':
                return 'bg-green-100 text-green-500 border border-green-200';
            default:
                return 'bg-gray-100 text-gray-500 border border-gray-200';
        }
    };

    return (
        <div className='flex flex-col'>
            <div className="flex justify-between items-center mb-8">
                <h5 className='text-xl font-semibold'>Recent Tasks</h5>
                <button type='button' onClick={()=> navigate('/admin/manage-tasks')} className='flex justify-center items-center gap-2 text-blue-600 font-semibold bg-blue-600/20 p-1 px-4 rounded hover:cursor-pointer group'>
                    See All
                    <ArrowRight className='size-5 group-hover:translate-x-1 transition' />
                </button>
            </div>
            <table className='flex-1'>
                <thead className='border-b border-gray-300'>
                    <tr>
                        <th className="text-left p-3">Task Name</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Priority</th>
                        <th className="text-left p-3">Due Date</th>
                    </tr>
                </thead>
                <tbody>

                    {tableData && tableData.map((task, index) => (
                        <tr className="hover:bg-gray-50" key={index}>
                            <td className="p-3">{task.title}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(task.status)}`}>
                                    {task.status}
                                </span>
                            </td>
                            <td className="p-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityBadgeColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                            </td>
                            <td className="p-3">{formatDate(task.dueDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TaskListTable
