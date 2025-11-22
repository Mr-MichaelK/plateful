// Made by Adam Abdel Karim
import React from "react";
import { useTheme } from "../context/ThemeContext";

const NewsletterSection = () => {
  const { theme } = useTheme();

  // Section-specific colors
  const sectionBg = theme === "dark" ? "#1f1f1f" : "#fff8f0"; 
  const headingColor = theme === "dark" ? "#f2d8d8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e0dcd5" : "#4a4a4a";
  const inputBg = theme === "dark" ? "#2a2a2a" : "#fff";
  const inputBorder = theme === "dark" ? "#5a191f" : "#ccc";
  const inputText = theme === "dark" ? "#f2d8d8" : "#4a4a4a";
  const buttonBg = theme === "dark" ? "#5a191f" : "#7a1f2a";
  const buttonHover = theme === "dark" ? "#7a1f2a" : "#a02a3d";

  return (
    <section
      className="py-14 px-6 text-center transition-colors duration-300"
      style={{ backgroundColor: sectionBg }}
    >
      <h2
        className="text-2xl font-bold mb-4 transition-colors duration-300"
        style={{ color: headingColor }}
      >
        Join Our Community
      </h2>
      <p
        className="mb-6 transition-colors duration-300"
        style={{ color: textColor }}
      >
        Get the latest recipes and meal tips delivered to your inbox.
      </p>
      <form className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="rounded-full px-4 py-2 w-full sm:w-2/3 transition-colors duration-300"
          style={{
            backgroundColor: inputBg,
            borderColor: inputBorder,
            color: inputText,
          }}
        />
        <button
          className="px-6 py-2 rounded-full transition-colors duration-300"
          style={{ 
            backgroundColor: buttonBg, 
            color: "#fff",
            cursor: "pointer"  // ← adds the hand cursor
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonBg)}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterSection;
