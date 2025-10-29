import { createContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../services/api.js";

export const AuthContext = createContext();
// In your AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  // ✅ CRITICAL: Set token in axios headers whenever token changes
  useEffect(() => {
    console.log("🔐 Setting auth token in axios:", token ? "Yes" : "No");
    setAuthToken(token);
  }, [token]);

  // Check user on app start
  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/api/user/checkUser");
        const payload = res.data?.user || res.data || {};
        const username = payload.username || "";
        const userid = payload.user_id || payload.id || "";
        setUser({ username, userid });
      } catch (err) {
        console.error("User check failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [token]);

  const login = (token, username, userid) => {
    console.log("🔐 Login - setting token:", token);
    setToken(token);
    localStorage.setItem("token", token);
    // setAuthToken(token) is automatically called by the useEffect above
    setUser({ username, userid });
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    // setAuthToken(null) is automatically called by the useEffect above
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
