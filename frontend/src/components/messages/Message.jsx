import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";

const Message = ({message}) => {
	const{authUser} = useAuthContext();
	const {selectedConversation}= useConversation();
	const fromMe = message.senderId === authUser._id;
	const chatClassName = fromMe ? 'chat chat-end' : 'chat chat-start';
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? 'bg-secondary' : 'bg-primary';

    return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white bg-secondary pb-2 ${bubbleBgColor}`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:34</div>
		</div>
	);
};
export default Message;


