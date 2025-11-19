import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTaskStore } from '../../store/useTaskStore';
import { ExternalLink, Loader2 } from 'lucide-react';
import AvatarGroup from '../../components/AvatarGroup';

const TaskDetails = () => {
    const { id } = useParams();
    const { task, fetchTaskById, updateTaskChecklist } = useTaskStore();

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

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'text-red-600';
            case 'Medium':
                return 'text-yellow-600';
            default:
                return 'text-blue-600';
        }
    };

    const updateTodoCheckList = async (index) => {
        if (!task) return;

        const updatedTodos = [...task.todoChecklist];
        updatedTodos[index].completed = !updatedTodos[index].completed;

        await updateTaskChecklist(id, updatedTodos);
    };

    const handleLinkClick = (link) => {
        if (!link || typeof link !== "string" || !link.startsWith("http")) {
            alert("Attachment link is missing or invalid!");
            console.warn("Invalid link:", link);
            return;
        }
        window.open(link, "_blank");
    };

    useEffect(() => {
        if (id) {
            fetchTaskById(id);
        }
    }, [id, fetchTaskById]);

    if (!task) {
        return (
            <div className="flex h-screen justify-center items-center">
                <Loader2 className='size-10 animate-spin text-blue-600' />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-6 p-6 bg-white m-6">
            <div className="flex items-start justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(task.status)}`}>
                    {task.status}
                </span>
            </div>

            <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{task.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Priority</h3>
                    <p className={`font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Due Date</h3>
                    <p className="text-gray-900">{task.dueDate}</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Assigned To</h3>
                    <div className="flex items-center -space-x-2">
                        <AvatarGroup avatars={task.assignedTo?.map(user => user.profileImageUrl || 'none') || []} maxVisible={5} />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Todo Checklist</h2>
                <div className="space-y-3">
                    {task.todoChecklist?.map((todo, index) => (
                        <label
                            key={index}
                            className="flex items-center cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => updateTodoCheckList(index)}
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className={`ml-3 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                {todo.text}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Attachments</h2>
                <div className="space-y-2">
                    {task.attachments?.map((attachment, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer"
                            onClick={() => handleLinkClick(attachment)}
                        >
                            <div className="flex items-center">
                                <span className="text-gray-500 text-sm mr-3 font-mono">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="text-gray-900">{attachment}</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;