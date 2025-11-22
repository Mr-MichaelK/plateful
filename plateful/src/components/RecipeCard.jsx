// Made by Adam Abdel Karim
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const RecipeCard = ({ recipe, id }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  // Card-specific colors
  const cardBg = theme === "dark" ? "#2a2a2a" : "#fff";
  const cardText = theme === "dark" ? "#f2d8d8" : "#7a1f2a";
  const descText = theme === "dark" ? "#e0dcd5" : "#4a4a4a";
  const hoverBg = theme === "dark" ? "#343434" : "#fdf5f0";

  return (
    <div
      onClick={handleClick}
      className="rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer hover:scale-[1.02]"
      style={{ backgroundColor: cardBg }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = cardBg)}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded-t-lg transition duration-300"
        style={{
          filter: theme === "dark" ? "brightness(85%)" : "brightness(100%)",
        }}
      />
      <div className="p-4">
        <h3
          className="font-semibold text-lg transition-colors duration-300"
          style={{ color: cardText }}
        >
          {recipe.title}
        </h3>
        <p
          className="text-sm mt-2 transition-colors duration-300"
          style={{ color: descText }}
        >
          {recipe.description}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
