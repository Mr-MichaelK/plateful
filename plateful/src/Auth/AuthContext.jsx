// AuthContext.js 
import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../apiConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // FIX: remove /api → because auth routes are at /auth/*
  const API_ROOT = API_BASE_URL.replace("/api", "");

  // CHECK AUTH
  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_ROOT}/auth/check`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();

      if (data.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // LOGOUT
  const logout = async () => {
    try {
      await fetch(`${API_ROOT}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);