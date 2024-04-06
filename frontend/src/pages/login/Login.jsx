import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-secondary bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40'>
                <h1 className='text-3xl font-semibold text-center text-neutral'>
                    Login to 
                    <span className='text-primary'> Mangloo</span>
                </h1>

                <form>
                    <div>
                        <label className='label '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                        />
                    </div>
                    <Link to='/signup' className='text-sm  hover:underline hover:text-accent mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 border-slate-700'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;