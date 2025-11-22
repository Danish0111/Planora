import { ArrowRight } from "lucide-react";
import React from "react";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

const TaskListTable = ({ tableData }) => {
  const navigate = useNavigate();

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600 border border-green-200";
      case "Pending":
        return "bg-purple-100 text-purple-600 border border-purple-200";
      case "In Progress":
        return "bg-cyan-100 text-cyan-600 border border-cyan-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600 border border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-600 border border-orange-200";
      case "Low":
        return "bg-green-100 text-green-600 border border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-xl font-semibold">Recent Tasks</h5>

        <button
          type="button"
          onClick={() => navigate("/admin/manage-tasks")}
          className="flex items-center gap-1 md:gap-2 text-blue-600 font-semibold bg-blue-50 px-2 md:px-4 py-1.5 rounded-md hover:bg-blue-100 transition"
        >
          See All
          <ArrowRight className="size-5 transition group-hover:translate-x-1" />
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 w-[100%]">
        <table className="w-full bg-white table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-600 ">Task Name</th>
              <th className="text-left p-3 font-semibold text-gray-600">Status</th>
              <th className="text-left p-3 font-semibold text-gray-600">Priority</th>
              <th className="text-left p-3 font-semibold text-gray-600">Due Date</th>
            </tr>
          </thead>

          <tbody>
            {tableData &&
              tableData.map((task, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-gray-700 whitespace-nowrap max-w-60 truncate">{task.title}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityBadgeColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="p-3 text-gray-700 whitespace-nowrap
">{formatDate(task.dueDate)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskListTable;
