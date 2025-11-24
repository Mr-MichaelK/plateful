import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import AuthHeader from "./components/AuthHeader.jsx";
import Title from "./components/Title.jsx";
import Box from "./components/Box.jsx";
import InputField from "./components/InputField.jsx";
import PrimaryButton from "./components/PrimaryButton.jsx";
import BottomText from "./components/BottomText.jsx";
import Footer from "../components/Footer.jsx";

// made by nour diab

export default function LogIn() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");       
  const [loading, setLoading] = useState(false); 

  const bgColor = theme === "dark" ? "#2a2a2a" : "#fff8f0";

  // auth check: if user already logged in (valid cookie), skip login and send to home
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5001/auth/check", {
          credentials: "include", // include cookies so backend can read jwt
        });

        if (!res.ok) return; // not authenticated, user can stay on login

        const data = await res.json();

        if (data.authenticated) {
          // user is already logged in, no need to log in again
          navigate("/home");
        }
      } catch (err) {
        console.error("auth check on login failed", err);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the default form refresh

    // basic front-end check: both fields have to be filled
    if (!email.trim() || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // send login request to backend
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include cookies so backend can set auth cookie for 30 days
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // if backend returns an error (wrong email or password), show it in the ui
      if (!res.ok) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      // login is successful: backend found the user and password matches the hash
      // added popup to confirm, then send user to the home page
      window.alert(`Welcome back, ${data.user.name}!`);
      navigate("/home");
    } catch (err) {
      console.error(err);
      // generic error if the server is down or not reachable
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: bgColor }}
    >
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

          {/* error text from validation or backend (wrong creds, etc.) */}
          {error && (
            <p className="text-red-600 text-sm mt-2" aria-live="polite">
              {error}
            </p>
          )}

          {/* login button. disabled when fields are empty or request is loading */}
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
