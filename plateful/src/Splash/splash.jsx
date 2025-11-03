import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const platefulLogo = new URL("/plateful-logo.svg", import.meta.url).href;

export default function Splash() {
  const [fade, setFade] = useState("opacity-0");
  const navigate = useNavigate();

  useEffect(() => {

    // make the logo the favicon
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.href = platefulLogo;
    document.head.appendChild(favicon);

    // fade effect for splash
    const fadeIn = setTimeout(() => setFade("opacity-100"), 100);
    const redirect = setTimeout(() => (navigate("/home")), 2500);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(redirect);
      if (document.head.contains(favicon)) document.head.removeChild(favicon);
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
