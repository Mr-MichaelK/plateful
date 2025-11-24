import React, { useState } from "react";
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

// for code reusability, components were created in the ./Auth/components folder for signup & login

// both fields are required
export default function LogIn() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const bgColor = theme === "dark" ? "#2a2a2a" : "#fff8f0";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: bgColor }}>
      <AuthHeader active="login" />

      <Title
        heading="Welcome back"
        subheading="Log in to access your saved recipes, meal plans, and favorite dishes."
      />

      <Box theme={theme}>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();

            if (!email.trim() || !password) {
              setError("Both fields are required.");
              return;
            }

            setError("");
            navigate("/home");
          }}
        >
          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            theme={theme}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            theme={theme}
          />

          {error && (
            <p
              className="text-red-600 text-sm mt-2"
              aria-live="polite"
            >
              {error}
            </p>
          )}

          <PrimaryButton
            text="Log in"
            type="submit"
            disabled={!email || !password}
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
