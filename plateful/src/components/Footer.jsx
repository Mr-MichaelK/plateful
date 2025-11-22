// file made by Adam (edited by Noura)
import React from "react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  // Custom footer-specific colors
  const footerBg = theme === "dark" ? "#1a1a1a" : "#fff8f0"; // dark gray vs light cream
  const footerText = theme === "dark" ? "#dcd6cf" : "#7a1f2a"; // light gray vs brown
  const borderColor = theme === "dark" ? "#333" : "#e5ded6"; // footer border
  const iconHover = theme === "dark" ? "#ffb2b2" : "#a02a3d"; // hover icons

  return (
    <footer
      className="text-center py-10 transition-colors duration-300 mt-0 -mb-px"
      style={{ backgroundColor: footerBg, color: footerText, borderTop: `1px solid ${borderColor}` }}
    >
      <img
        src="/plateful-logo.svg"
        alt="Plateful Logo"
        className="mx-auto w-12 mb-3 transition duration-300"
        style={{ filter: theme === "dark" ? "brightness(75%)" : "brightness(100%)" }}
      />

      <p className="text-sm mb-4" style={{ color: footerText }}>
        © 2025 Plateful. All rights reserved.
      </p>

      <div className="flex justify-center space-x-4 text-xl sm:text-2xl">
        {["facebook", "instagram", "twitter"].map((platform) => (
          <a
            key={platform}
            href="#"
            className="transition-transform duration-200 hover:scale-110"
            style={{ color: footerText }}
            onMouseEnter={(e) => (e.currentTarget.style.color = iconHover)}
            onMouseLeave={(e) => (e.currentTarget.style.color = footerText)}
          >
            <i className={`fab fa-${platform}`}></i>
          </a>
        ))}
      </div>

      {/* added by Noura (for mobile view) */}
      <style>
        {`
          @media (max-width: 400px) {
            footer .space-x-4 {
              flex-direction: column;
              gap: 8px;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
