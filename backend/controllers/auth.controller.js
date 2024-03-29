import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        // Destructure the request body to extract relevant fields
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Determine profile picture URL based on gender
        const profilePic = gender === 'male' ?
            `https://avatar.iran.liara.run/public/boy?username=${username}` :
            `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create a new user instance with hashed password and profile picture
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic
        });

        // Check if newUser object is valid
        if (newUser) {
            // Generate JWT token and set it as a cookie
            generateTokenAndSetCookie(newUser._id, res);
            
            // Save the new user to the database
            await newUser.save();

            // Respond with 201 status and user data
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
                gender: newUser.gender
            });
        } else {
            // If newUser object is invalid, return an error
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        // Handle errors
        console.log("Error in signup Controller: ", error);
        res.status(500).json({ message: "Something went wrong " });
    };
};

export const login = async (req, res) => {
    try {
        // Destructure the request body to extract username and password
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        // If user not found, return 404 status
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        // If password is incorrect, return 400 status
        if (!isPasswordCorrect || !user) {
            return res.status(400).json({ message: "Invalid Username Or Password" });
        }

        // Generate JWT token and set it as a cookie
        generateTokenAndSetCookie(user._id, res);

        // Respond with 200 status and user data
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        // Handle errors
        console.log("Error in login Controller: ", error);
        res.status(500).json({ message: "Something went wrong " });
    }
};

export const logout = async (req, res) => {
    try {
        // Clear JWT cookie
        res.cookie('jwt', '', { maxAge: 0});

        // Respond with 200 status and success message
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        // Handle errors
        console.log("Error in logout Controller: ", error);
        res.status(500).json({ message: "Something went wrong " });
    }
};
