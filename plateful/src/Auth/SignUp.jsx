import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthHeader from "./components/AuthHeader.jsx";
import Title from "./components/Title.jsx";
import Box from "./components/Box.jsx";
import InputField from "./components/InputField.jsx";
import Checkbox from "./components/Checkbox.jsx";
import PrimaryButton from "./components/PrimaryButton.jsx";
import BottomText from "./components/BottomText.jsx";
import Footer from "../components/Footer.jsx";
import { useTheme } from "../context/ThemeContext";

// made by nour diab

export default function SignUp() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const bgColor = theme === "dark" ? "#1e1e1e" : "#fff8f0";
  const textColor = theme === "dark" ? "#ddd" : "#444";

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the page from refreshing

    // front-end validation before talking to the backend
    if (!agree) return; // user has to accept the checkbox

    if (!name.trim() || !email.trim() || !password) {
      setError("All fields are required.");
      return;
    }

    // same password rule as the backend: at least 12 chars
    if (password.length < 12) {
      setError("Password must be at least 12 characters long.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // send signup request to backend
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      // if backend returns an error (ex: email already in use), show it under the form
      if (!res.ok) {
        setError(data.error || "Something went wrong during sign up.");
        return;
      }

      // everything is good: user is created in the database
      // added a simple browser popup to confirm, then send them to the home page
      window.alert("Account created successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      // fallback message if the server is down or not reachable
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: bgColor, color: textColor }}
    >

      <AuthHeader active="signup" />

      <Title
        heading="Cook smarter with Plateful"
        subheading="Sign up to plan meals, save recipes, and keep your kitchen organized in minutes."
      />

      <Box>
        <form className="w-full" onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* show any error message coming from validation or backend */}
          {error && (
            <p className="text-red-600 text-sm mt-2" aria-live="polite">
              {error}
            </p>
          )}

          <Checkbox checked={agree} onChange={setAgree} />

          {/* main submit button. disabled when form is not ready or when request is in progress */}
          <PrimaryButton
            text={loading ? "Signing up..." : "Sign up for free"}
            disabled={
              loading ||
              !agree ||
              !name.trim() ||
              !email.trim() ||
              !password
            }
            type="submit"
          />

          <BottomText
            textBefore="Already have a Plateful account?"
            linkHref="/log-in"
            linkText="Log in"
          />
        </form>
      </Box>

      <Footer theme={theme} />
    </div>
  );
}
