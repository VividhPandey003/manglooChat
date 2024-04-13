import { Link } from "react-router-dom";
import { useState } from 'react'
import useLogin from "../../hooks/useLogin";


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ username, password })
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-secondary bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40'>
                <h1 className='text-3xl font-semibold text-center text-neutral'>
                    Login to
                    <span className='text-primary'> ManglooChat😼</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10'
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            autoComplete="on"
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link to='/signup' className='text-sm  hover:underline hover:text-accent mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 border-slate-700' disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;