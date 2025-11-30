// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../apiConfig"; // Import your API Base URL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user data if authenticated
  const [loading, setLoading] = useState(true); // To prevent flashing content

  // 1. Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      // Must include credentials for the browser to send the auth_token cookie
      const response = await fetch(`${API_BASE_URL}/auth/check`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok && data.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Run check when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 2. Function to handle frontend sign-out
  const signOut = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null); // Clear local state immediately
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, setUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
