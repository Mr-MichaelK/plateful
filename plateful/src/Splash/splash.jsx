import React, { useEffect, useState } from "react";

const platefulLogo = new URL("/plateful-logo.svg", import.meta.url).href;

export default function Splash() {
  const [fade, setFade] = useState("opacity-0");

  useEffect(() => {

    // make the logo the favicon
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.href = platefulLogo;
    document.head.appendChild(favicon);

    // fade effect for splash
    const fadeIn = setTimeout(() => setFade("opacity-100"), 100);

    //go to signup.html
    const redirect = setTimeout(() => (window.location.href = "/signup.html"), 2500);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(redirect);
      if (document.head.contains(favicon)) document.head.removeChild(favicon);
    };
  }, []);

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
