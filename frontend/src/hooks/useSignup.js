import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;
        setLoading(true);


        try {
            const res = await fetch(`/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            if (!res.ok) {
                throw new Error(data.message);
            }
            toast.success("Signed Up Successfully! ", data.message, { duration: 1500 });

            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            console.error(error);
            toast.error(error.message, { duration: 1500 });
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading };
};

export default useSignup;

export function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields", { duration: 1500 });
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match", { duration: 1500 });
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters", { duration: 1500 });
        return false;
    }

    return true;
}
