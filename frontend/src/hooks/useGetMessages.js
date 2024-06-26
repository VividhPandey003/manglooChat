import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";
import useConversation from "../store/useConversation";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        if (!selectedConversation) return;
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (selectedConversation?._id) fetchMessages();
    }, [selectedConversation, selectedConversation._id, setMessages]);
    return { loading, messages };
}

export default useGetMessages;