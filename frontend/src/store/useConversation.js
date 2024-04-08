import {create} from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({selectedConversation: conversation}),
    message: [],
    setMessages: (messages) => set({messages}),
}));

export default useConversation;