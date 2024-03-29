export const getUsersForSidebar = async (req, res) => {
    try { 

        const loggedInUserId = req.user._id;
    } catch (error) 
    {
        console.error("Error in getUsersForSidebar Controller: ", error);
        res.status(500).json({ message: "Something went wrong" });

    };