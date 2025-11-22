// Made by Michael Kolanjian
import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function QuoteSection() {
  const { theme } = useTheme();

  // Section-specific colors
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fff0e5"; // dark gray vs light cream
  const headingColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a"; // light pink vs brown
  const textColor = theme === "dark" ? "#e0dcd5" : "#555555"; // light gray vs dark gray

  return (
    <section
      className="mt-10 px-6 py-8 rounded-xl shadow-sm text-center max-w-3xl mx-auto transition-colors duration-300"
      style={{ backgroundColor: sectionBg }}
    >
      <h2
        className="text-2xl font-semibold mb-4 transition-colors duration-300"
        style={{ color: headingColor }}
      >
        Plan Smarter with Plateful
      </h2>
      <p
        className="text-lg italic transition-colors duration-300"
        style={{ color: textColor }}
      >
        “Good food is the foundation of genuine happiness.” — Auguste Escoffier
      </p>
    </section>
  );
}
