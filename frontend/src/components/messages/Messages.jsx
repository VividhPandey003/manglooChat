import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
// import useListenMessages from "../../hooks/useListenMessages";


const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log(messages)
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 && messages.map((message) => (
        <Message key={message._id} message={message} />
        
      ))}
      {loading && [...Array(6)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && (messages.length === 0 || messages == undefined) && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}

    </div>
  )
}

export default Messages;
