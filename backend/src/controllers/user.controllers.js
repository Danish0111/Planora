import taskModel from "../models/task.model.js";
import userModel from "../models/user.model.js";

export const getUsers = async (req, res)=> {
    try {
        const users = await userModel.find({role: "member"}).select("-password");

        const userWithTaskCounts = await Promise.all(users.map(async (user)=> {
            const pendingTasks = await taskModel.countDocuments({assignedTo: user._id, status: "Pending"});
            const inProgressTasks = await taskModel.countDocuments({assignedTo: user._id, status: "In Progress"});
            const completedTasks = await taskModel.countDocuments({assignedTo: user._id, status: "Completed"});

            return {
                ...user._doc,
                pendingTasks,
                inProgressTasks,
                completedTasks,
            };
        }));

        res.json(userWithTaskCounts);
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message});
    }
}

export const getyUserById = async (req, res)=> {
    try {
        const user = await userModel.find(req.params.id).select("-password");
        if(!user) {
            res.status(404).json({message: "user not found"});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message});
    }
}