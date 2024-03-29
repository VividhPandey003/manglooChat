import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        //Promise all to save both new message and conversation in parallel 
        await Promise.all([newMessage.save(), conversation.save()]);

        res.status(201).json({ message: newMessage });
    } catch (error) {
        console.log("Error in sendMessage Controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}