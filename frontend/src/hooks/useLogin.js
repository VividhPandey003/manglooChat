import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
const useLogin = () => {

    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const login = async ({ username, password }) => {
        const success = handleInputErrors({ username, password })
        if(!success) return;   
        setLoading(true)
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            console.log(data)
            toast.success("Logged in Successfully!!", { duration: 1500 })
            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            console.log(error)
            toast.error("Error logging in..", error)
        } finally {
            setLoading(false)
        }
    }
    return { login, loading }
}

export default useLogin

export function handleInputErrors({ username, password }) {
    if (!username || !password ) {
        toast.error("Please fill in all fields", { duration: 1500 });
        return false;
    }
    return true;
}
