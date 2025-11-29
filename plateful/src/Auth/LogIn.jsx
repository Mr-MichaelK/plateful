import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../Auth/AuthContext";
import { API_BASE_URL } from "../apiConfig";

import AuthHeader from "./components/AuthHeader.jsx";
import Title from "./components/Title.jsx";
import Box from "./components/Box.jsx";
import InputField from "./components/InputField.jsx";
import PrimaryButton from "./components/PrimaryButton.jsx";
import BottomText from "./components/BottomText.jsx";
import Footer from "../components/Footer.jsx";

export default function LogIn() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const bgColor = theme === "dark" ? "#2a2a2a" : "#fff8f0";

  // backend root
  const API_ROOT = API_BASE_URL.replace("/api", "");

  // redirect if logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_ROOT}/auth/check`, {
          credentials: "include",
        });

        if (!res.ok) return;
        const data = await res.json();
        if (data.authenticated) navigate("/home");
      } catch {}
    };

    checkAuth();
  }, [navigate, API_ROOT]);  // FIXED

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_ROOT}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      setUser(data.user);

      window.alert(`Welcome back, ${data.user.name}!`);
      navigate("/home");
    } catch (err) {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: bgColor }}>
      <AuthHeader active="login" />

      <Title
        heading="Welcome back"
        subheading="Log in to access your saved recipes, meal plans, and favorite dishes."
      />

      <Box theme={theme}>
        <form className="w-full" onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            theme={theme}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            theme={theme}
          />

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <PrimaryButton
            text={loading ? "Logging in..." : "Log in"}
            type="submit"
            disabled={loading || !email || !password}
            theme={theme}
          />

          <BottomText
            textBefore="Don’t have an account?"
            linkHref="/sign-up"
            linkText="Sign up"
            theme={theme}
          />
        </form>
      </Box>

      <Footer theme={theme} />
    </div>
  );
}