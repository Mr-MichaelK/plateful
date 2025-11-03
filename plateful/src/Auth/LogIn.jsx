import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthHeader from "./components/AuthHeader.jsx";
import Title from "./components/Title.jsx";
import Box from "./components/Box.jsx";
import InputField from "./components/InputField.jsx";
import PrimaryButton from "./components/PrimaryButton.jsx";
import BottomText from "./components/BottomText.jsx";
import Footer from "../components/Footer.jsx";

// made by nour diab

// for code reusability, components were created in the ./Auth/components folder for signup & login

// there exists no backend/db to confirm that user already has an account
// any user can log in for now
// real log in behavior will be implemented in the backend phase of the project

// both fields are required
export default function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#fff8f0] flex flex-col">
      <AuthHeader active="login" />

      <Title
        heading="Welcome back"
        subheading="Log in to access your saved recipes, meal plans, and favorite dishes."
      />

      <Box>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/home");
          }}
        >
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

          <PrimaryButton
            text="Log in"
            type="submit"
            disabled={!email || !password}
          />

          <BottomText
            textBefore="Don’t have an account?"
            linkHref="/sign-up"
            linkText="Sign up"
          />
        </form>
      </Box>

      <Footer />
    </div>
  );
}
