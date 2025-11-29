// Made by Adam Abdel Karim — Backend Connected Version
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { API_BASE_URL } from "../apiConfig";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Remove /api from root to load images correctly
  const API_ROOT = API_BASE_URL.replace(/\/api$/, "");

  const buildImageUrl = (imgPath) => {
    if (!imgPath) return "";
    if (imgPath.startsWith("http")) return imgPath;
    return `${API_ROOT}${imgPath}`;
  };

  const handleClick = () => {
    navigate(`/recipe/${encodeURIComponent(recipe.title)}`);
  };

  // Colors
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const titleColor = theme === "dark" ? "#f2d8d8" : "#7a1f2a";
  const descColor = theme === "dark" ? "#e0dcd5" : "#4a4a4a";

  // --- IMAGE LOGIC ---
  // Support main image + extraImages array
  const imageList = [
    recipe.image,
    ...(recipe.images || []),
    ...(recipe.extraImages || []),
  ].filter(Boolean);

  const mainImage = buildImageUrl(imageList[0]);

  return (
    <div
      onClick={handleClick}
      className="rounded-lg shadow transition-all duration-200 cursor-pointer hover:scale-[1.02] group overflow-hidden flex flex-col h-full"
      style={{ backgroundColor: cardBg }}
    >
      {/* IMAGE */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={mainImage}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{
            filter: theme === "dark" ? "brightness(85%)" : "brightness(100%)",
          }}
        />
      </div>

      {/* TEXT */}
      <div className="p-4 flex-grow bg-white">
        <h3
          className="font-semibold text-lg mb-1"
          style={{ color: titleColor }}
        >
          {recipe.title}
        </h3>

        <p className="text-sm line-clamp-3" style={{ color: descColor }}>
          {recipe.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
