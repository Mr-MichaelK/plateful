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

// for code reusability, components were created in the ./Auth/components folder for signup & login

// for now, any user can sign up, except one: the user Mohammad Farhat
// if the email "mohammadfarhat@lau.edu.lb" is entered (with ANY name/password),
// he is notified that he already has an account, and needs to login instead

// all fields are required

export default function SignUp() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const blockedEmail = "mohammadfarhat@lau.edu.lb";

  const bgColor = theme === "dark" ? "#1e1e1e" : "#fff8f0";
  const textColor = theme === "dark" ? "#ddd" : "#444";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: bgColor, color: textColor }}>
      <AuthHeader active="signup" />

      <Title
        heading="Cook smarter with Plateful"
        subheading="Sign up to plan meals, save recipes, and keep your kitchen organized in minutes."
      />

      <Box>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();

            if (!agree) return;

            if (!name.trim() || !email.trim() || !password) {
              setError("All fields are required.");
              return;
            }

            if (password.length < 12) {
              setError("Password must be at least 12 characters long.");
              return;
            }

            if (email.trim().toLowerCase() === blockedEmail) {
              setError("You already have an account. Please log in instead.");
              return;
            }

            setError("");
            navigate("/home");
          }}
        >
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

          {error && (
            <p className="text-red-600 text-sm mt-2" aria-live="polite">
              {error}
            </p>
          )}

          <Checkbox checked={agree} onChange={setAgree} />

          <PrimaryButton
            text="Sign up for free"
            disabled={!agree || !name.trim() || !email.trim() || !password}
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
