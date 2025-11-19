import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

const generateToken = (userId, res) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
    return token;
}

export const signup = async (req, res)=> {
    try {
        console.log("Signup body:", req.body);
        const { fullName, email, password, profileImageUrl, adminInviteToken } = req.body;
        const userExists = await userModel.findOne({ email });

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be ayt least 6 characters" });
        }

        if(userExists) {
            return res.status(400).json({message: "user already exist"})
        }
        
        let role = "member";
        if(adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = "admin";
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
            profileImageUrl,
            role
        });

        generateToken(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
        });
    } catch (error) {
        console.log("Error is signup controller", error.message);
        res.status(500).json({message: "internal server error", error: error.message});
    }
}

export const login = async (req, res)=> {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});

        if(!user) {
            return res.status(401).json({message: "invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: "invalid email or password"});
        }

        generateToken(user._id, res);
        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
        });
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserProfile = async (req, res)=> {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if(!user) {
            res.status(404).json({message: "User not found"});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message});
    }
}

export const updateProfile = async (req, res)=> {
    try {
        const user = await userModel.findById(req.user.id);
        if(!user) {
            return res.status(401).json({message: "user not found"});
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        generateToken(user._id, res);
        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            role: updatedUser.role,
            profileImageUrl: updatedUser.profileImageUrl,
        })

    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message});
    }
}

export const updateProfileImage = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user.id;

        if (!profilePic) {
            return res.status(404).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await userModel.findByIdAndUpdate(userId, {profileImageUrl:uploadResponse.secure_url}, {new: true});

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile: ", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export const check = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in update profile: ", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export const isAdmin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isAdmin = req.user.role === "admin";
        res.status(200).json({ isAdmin });
    } catch (error) {
        console.log("Error in isAdmin: ", error);
        res.status(500).json({message: "Internal server error"})
    }
}