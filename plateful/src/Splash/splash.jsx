import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// made by nour diab

const platefulLogo = new URL("/plateful-logo.svg", import.meta.url).href;

export default function Splash() {
  const [fade, setFade] = useState("opacity-0");
  const navigate = useNavigate();

  useEffect(() => {
    const fadeIn = setTimeout(() => setFade("opacity-100"), 100);

    // go to sign-up
    const redirect = setTimeout(() => navigate("/sign-up"), 2500);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(redirect);
    };
  }, [navigate]);

  // white background and centering logo
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img
        src={platefulLogo}
        alt="Plateful Logo"
        className={`w-32 h-auto transition-opacity duration-700 ease-in-out ${fade}`}
      />
    </div>
  );
}
