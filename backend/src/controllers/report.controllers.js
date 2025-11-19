import excelJS from "exceljs";
import taskModel from "../models/task.model.js";
import userModel from "../models/user.model.js";

export const exportTasksReport = async (req, res) => {
    try {
        const tasks = await taskModel.find().populate("assignedTo", "fullName email").lean();

        console.log("Total tasks found:", tasks.length);
        console.log("First task raw:", JSON.stringify(tasks[0], null, 2));
        
        if (tasks[0]?.assignedTo && tasks[0].assignedTo.length > 0) {
            console.log("First assignedTo user:", tasks[0].assignedTo[0]);
            console.log("Has fullName?", tasks[0].assignedTo[0].fullName);
            console.log("Has email?", tasks[0].assignedTo[0].email);
            console.log("All keys:", Object.keys(tasks[0].assignedTo[0]));
        }
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Report");

        worksheet.columns = [
            { header: "Task ID", key: "id", width: 30 },
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Priority", key: "priority", width: 50 },
            { header: "Status", key: "status", width: 15 },
            { header: "Due Date", key: "dueDate", width: 20 },
            { header: "Assigned To", key: "assignedTo", width: 30 },
        ];
        tasks.forEach((task) => {
            let assignedToText = 'Unassigned';
            
            if (task.assignedTo && task.assignedTo.length > 0) {
                assignedToText = task.assignedTo
                    .map(user => `${user.fullName} (${user.email})`)
                    .join(', ');
            }
            worksheet.addRow({
                id: task._id.toString(),
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
                assignedTo: assignedToText,
            });
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=tasks_report.xlsx");

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (error) {
        res.status(500).json({ message: "Error exporting tasks", error: error.message });
        console.log("Error exporting tasks:", error);
    }
}

export const exportUsersReport = async (req, res) => {
    try {
        const users = await userModel.find().select("fullName email _id").lean();
        const userTasks= await taskModel.find().populate("assignedTo", "fullName email _id");

        const userTaskMap = {};
        users.forEach((user) => {
            userTaskMap[user._id] = {
                fullName: user.fullName,
                email: user.email,
                taskCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            };
        });

        userTasks.forEach((task) => {
            if(task.assignedTo) {
                task.assignedTo.forEach((assignedUser) => {
                    if(userTaskMap[assignedUser._id]) {
                        userTaskMap[assignedUser._id].taskCount += 1;
                        if(task.status === "Pending") userTaskMap[assignedUser._id].pendingTasks += 1;
                        else if(task.status === "In Progress") userTaskMap[assignedUser._id].inProgressTasks += 1;
                        else if(task.status === "Completed") userTaskMap[assignedUser._id].completedTasks += 1;
                    }
                })
            }
        })

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Users Report");

        worksheet.columns = [
            { header: "Full Name", key: "fullName", width: 30 },
            { header: "Email", key: "email", width: 30 },
            { header: "Total Tasks", key: "taskCount", width: 15 },
            { header: "Pending Tasks", key: "pendingTasks", width: 15 },
            { header: "In Progress Tasks", key: "inProgressTasks", width: 15 },
            { header: "Completed Tasks", key: "completedTasks", width: 15 },
        ];
        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow(user);
        })

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=users_report.xlsx");
        
        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (error) {
        res.status(500).json({ message: "Error exporting tasks", error: error.message });
        console.log("Error exporting tasks:", error);
    }
}