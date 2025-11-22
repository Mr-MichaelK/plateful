import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Title({ heading, subheading }) {
  const { theme } = useTheme();

  // Theme-based colors
  const headingColor = "#7a1f2a"; // same for light and dark
  const subheadingColor = theme === "dark" ? "#ccc" : "#6b6b6b";

  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      <h1
        className="text-3xl font-bold mb-3"
        style={{ color: headingColor }}
      >
        {heading}
      </h1>
      <p
        className="text-base leading-snug"
        style={{ color: subheadingColor }}
      >
        {subheading}
      </p>
    </div>
  );
}
