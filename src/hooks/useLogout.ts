import router from "../components/Routes";
import { API_URL } from "../constants/urls";

const useLogout = () => {
  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error("Failed to log out");
    }
    router.navigate("/login");
  };

  return { logout };
};

export { useLogout };
