import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
// Middleware to protect routes

const protectRoute = async(req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;
        // If token is not present, return 401 status
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token Not Present" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ message: "Unauthorized- Invalid Token" });
        }
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(401).json({ message: "Unauthorized- User not found" });
        }   

        req.user= user;
        next();
        
    } catch (error) {
        // Handle errors
        console.log("Error in protectRoute Middleware: ", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}   

export default protectRoute;