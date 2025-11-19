import { CalendarRange, DeleteIcon, Loader2, Paperclip, Plus, Trash, Trash2, UserPlus } from "lucide-react"
import { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import Dropdown from "../../components/Dropdown";
import SelectUser from "../../components/SelectUser";
import TodoListInput from "../../components/TodoListInput";
import AddAttachment from "../../components/AddAttachment";
import { toast } from 'react-hot-toast';
import { axiosInstance } from "../../utils/axios";
import { useTaskStore } from "../../store/useTaskStore";
import { create } from "zustand";
import Modal from "../../components/Modal";

const CreateTasks = () => {
  const location = useLocation();
  const taskId = location.state?.taskId;
  const navigate = useNavigate();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const { loading, createTask, task, fetchTaskById, updateTask, deleteTask } = useTaskStore();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    assignedTo: [],
    todoCheckList: [],
    attachments: [],
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");

  const handleValueChange = (name, value) => {
    setTaskData({ ...taskData, [name]: value });
  }

  const cleardata = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "",
      dueDate: "",
      assignedTo: [],
      todoCheckList: [],
      attachments: [],
    });
  }

  const handleUpdate = () => {
    const todoList = taskData.todoCheckList.map((item) => {
      const prevTodoChecklist = currentTask.todoChecklist || [];
      const matchedItem = prevTodoChecklist.find((todo) => todo.text === item);
      return {
        text: item,
        completed: matchedItem ? matchedItem.completed : false,
      };
    })
    updateTask(taskId, {
      ...taskData,
      dueDate: new Date(taskData.dueDate).toISOString(),
      todoChecklist: todoList,
    });
  }

  const handleSubmit = ((e) => {
    e.preventDefault();
    setError(null);
    if (taskData.title.trim() === "") {
      setError("Task title is required");
      return;
    }
    if (taskData.description.trim() === "") {
      setError("Task description is required");
      return;
    }
    if (taskData.priority.trim() === "") {
      setError("Task priority is required");
      return;
    }
    if (taskData.dueDate.trim() === "") {
      setError("Task due date is required");
      return;
    }
    if (taskData.assignedTo.length === 0) {
      setError("Please assign the task to at least one user");
      return;
    }
    if (taskData.todoCheckList.length === 0) {
      setError("Please add at least one todo item");
      return;
    }
    if (taskId) {
      handleUpdate();
      return;
    }
    const todoList = taskData.todoCheckList.map((item) => ({
      text: item,
      completed: false,
    }));

    createTask({
      ...taskData,
      dueDate: new Date(taskData.dueDate).toISOString(),
      todoChecklist: todoList,
    });
    cleardata();
  });

  const handleDelete = () => {
    deleteTask(taskId);
    setOpenDeleteAlert(false);
    navigate('/manage-tasks');
  }

  useEffect(() => {
    if (taskId) {
      fetchTaskById(taskId);
    }
  }, [taskId]);

  useEffect(() => {
    if (task) {
      setCurrentTask(task);
      setTaskData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "",
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : "",
        assignedTo: task.assignedTo?.map(user => user._id) || [],
        todoCheckList: task.todoChecklist ? task.todoChecklist.map(item => item.text) : [],
        attachments: task.attachments || [],
      });
    }
  }, [task]);

  return (
    <div className="p-5 relative">
      <div className="p-6 bg-white rounded-xl shadow-sm ">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold">{taskId ? 'Update Task' : 'Create Task'}</h1>
          {taskId && (
            <div onClick={()=> setOpenDeleteAlert(true)} className="flex justify-center items-center hover:cursor-pointer bg-red-600/10 hover:bg-red-600/20 transition text-red-600 gap-2 p-2 rounded-lg">
              <Trash2 className="size-5 rounded-full transition" />
              <span>Delete</span>
            </div>
          )}
        </div>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Task Title</label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) => handleValueChange("title", e.target.value)}
              placeholder="Enter task title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              value={taskData.description}
              onChange={(e) => handleValueChange("description", e.target.value)}
              rows="4"
              placeholder="Enter task description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Priority</label>
              <Dropdown
                options={['Low', 'Medium', 'High']}
                value={taskData.priority}
                onChange={(value) => handleValueChange("priority", value)}
                placeholder="Select Priority"
              />
            </div>

            <div>
              <div className="block text-gray-700 font-medium mb-2">Due Date</div>
              <div className="relative">
                <input
                  type="date"
                  value={taskData.dueDate}
                  onChange={(e) => handleValueChange("dueDate", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="block text-gray-700 font-medium mb-2">Assign To</div>
              <SelectUser selectedUser={taskData.assignedTo} setSelectedUser={(value) => handleValueChange("assignedTo", value)} />
            </div>
          </div>

          <div>
            <div className="block text-gray-700 font-medium mb-2">TODO Checklist</div>
            <TodoListInput todoList={taskData?.todoCheckList} setTodoList={(value) => handleValueChange("todoCheckList", value)} />
          </div>

          <div>
            <div className="block text-gray-700 font-medium mb-2">Add Attachments</div>
            <AddAttachment attachments={taskData?.attachments} setAttachments={(value) => handleValueChange("attachments", value)} />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {(taskId && !loading) ? 'UPDATE TASK' : 'CREATE TASK'}
            {loading && <Loader2 className="size-5 ml-2 inline-block animate-spin" />}
          </button>

          <Modal isOpen={openDeleteAlert} onClose={()=> setOpenDeleteAlert(false)} title="Delete Task">
            <div className="p-4">
              <p className="text-gray-700 mb-4">Are you sure you want to delete this task? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button onClick={()=> setOpenDeleteAlert(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                <button onClick={()=> handleDelete()} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Delete</button>
              </div>
            </div>
          </Modal>
        </form>
      </div>
    </div>
  )
}

export default CreateTasks
