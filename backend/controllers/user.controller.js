import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try { 

        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); // display all users except the logged in user in the sidebar ($ne means not equal to)

        res.status(200).json({ users: allUsers });
    } catch (error) 
    {
        console.error("Error in getUsersForSidebar Controller: ", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};