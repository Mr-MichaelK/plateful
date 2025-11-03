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

// made by nour diab

// for code reusability, components were created in the ./Auth/components folder for signup & login

// there exists no backend/db to confirm whether a user already has an account or needs to sign up
// for now, any user can sign up 
// real sign up behavior will be implemented in the backend phase of the project

// all fields are required
export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <div className="min-h-screen bg-[#fff8f0] flex flex-col">
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
            if (!agree) return; // users cannot sign up before they check the agree terms of use and privacy policy box
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

          <Checkbox checked={agree} onChange={setAgree} />

          <PrimaryButton
            text="Sign up for free"
            disabled={!agree}
            type="submit"
          />

          <BottomText
            textBefore="Already have a Plateful account?"
            linkHref="/log-in"
            linkText="Log in"
          />
        </form>
      </Box>

      <Footer />
    </div>
  );
}
