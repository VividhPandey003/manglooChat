import Sidebar from "../../components/sidebar/Sidebar.jsx";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg bg-secondary overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20'>
			<Sidebar />
			{/* <MessageContainer /> */}
		</div>
	);
};
export default Home;