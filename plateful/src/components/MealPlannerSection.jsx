// Made by Adam Abdel Karim
import React from "react";
import { useTheme } from "../context/ThemeContext";

const MealPlannerSection = () => {
  const { theme } = useTheme();

  // Section-specific colors
  const sectionBg = theme === "dark" ? "#1f1f1f" : "#fef5ee"; // dark gray vs light cream
  const headingColor = theme === "dark" ? "#f2d8d8" : "#7a1f2a"; // heading
  const textColor = theme === "dark" ? "#e0dcd5" : "#4a4a4a"; // paragraph
  const buttonBg = theme === "dark" ? "#5a191f" : "#7a1f2a"; // button
  const buttonHover = theme === "dark" ? "#7a1f2a" : "#a02a3d"; // button hover

  return (
    <section
      className="py-14 px-6 text-center transition-colors duration-300"
      style={{ backgroundColor: sectionBg }}
    >
      <h2
        className="text-2xl font-bold mb-4 transition-colors duration-300"
        style={{ color: headingColor }}
      >
        Plan Your Meals Effortlessly
      </h2>
      <p
        className="max-w-lg mx-auto transition-colors duration-300"
        style={{ color: textColor }}
      >
        Organize your weekly menu, save favorite recipes, and create grocery lists
        — all in one place.
      </p>
      <a
        href="/meal-plans"
        className="inline-block mt-6 px-6 py-3 rounded-full transition-colors duration-300"
        style={{ backgroundColor: buttonBg, color: "#fff" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHover)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonBg)}
      >
        Start Planning
      </a>
    </section>
  );
};

export default MealPlannerSection;
