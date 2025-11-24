// Made by Adam Abdel Karim — Backend Connected Version by Noura
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleClick = () => {
    navigate(`/recipe/${encodeURIComponent(recipe.title)}`);
  };

  // Colors
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const hoverBg = theme === "dark" ? "#343434" : "#fdf5f0";
  const titleColor = theme === "dark" ? "#f2d8d8" : "#7a1f2a";
  const descColor = theme === "dark" ? "#e0dcd5" : "#4a4a4a";

  return (
    <div
      onClick={handleClick}
      className="rounded-lg shadow transition-all duration-200 cursor-pointer hover:scale-[1.02] group overflow-hidden"
      style={{ backgroundColor: cardBg }}
    >
      {/* IMAGE */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{
            filter: theme === "dark" ? "brightness(85%)" : "brightness(100%)",
          }}
        />
      </div>

      {/* TEXT */}
      <div
        className="p-4 transition-colors duration-300 group-hover:bg-opacity-90"
        style={{ backgroundColor: cardBg }}
      >
        <h3
          className="font-semibold text-lg mb-1"
          style={{ color: titleColor }}
        >
          {recipe.title}
        </h3>

        <p
          className="text-sm line-clamp-3"
          style={{ color: descColor }}
        >
          {recipe.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;