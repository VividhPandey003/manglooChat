import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();


  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      console.log(error);
      toast.error(error.message), { duration: 1500 };
    } finally {
      setLoading(false);
    }
  }
  return { logout, loading };
}

export default useLogout;