import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(400).json({message: "Unauthorized - No token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(400).json({message: "Unauthorized - Invalid token"});
        }

        const user = await userModel.findById(decoded.id).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        return res.status(400).json({message: "Internal server error"});
    }
}

export const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        next();
    }
    else {
        res.status(401).json({message: "Access denied, admin only"});
    }
}
