// Made by Adam Abdel Karim
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import cookingVideo from "../assets/cooking1.mp4";

const HeroSection = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleBrowse = () => {
    navigate("/recipes");
  };

  // Custom hero-specific colors
  const overlayBg = theme === "dark" ? "rgba(0,0,0,0.4)" : "rgba(246,233,218,0.4)";
  const cardBg = theme === "dark" ? "rgba(50,50,50,0.6)" : "rgba(255,255,255,0.6)";
  const headingColor = theme === "dark" ? "#f2d8d8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e0dcd5" : "#4a4a4a";
  const buttonBg = theme === "dark" ? "#5a191f" : "#7a1f2a";
  const buttonHover = theme === "dark" ? "#7a1f2a" : "#a02a3d";

  return (
    <section className="relative text-center py-20 px-6 overflow-hidden transition-colors duration-300">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={cookingVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <div
        className="absolute inset-0 backdrop-blur-[2px] transition-colors duration-300"
        style={{ backgroundColor: overlayBg }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div
          className="backdrop-blur-sm p-8 rounded-xl shadow-lg transition-colors duration-300"
          style={{ backgroundColor: cardBg }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md transition-colors duration-300"
            style={{ color: headingColor }}
          >
            Discover Delicious Recipes & Plan Meals Like a Pro
          </h2>
          <p
            className="mb-6 drop-shadow-sm transition-colors duration-300"
            style={{ color: textColor }}
          >
            Explore our collection of easy, healthy, and tasty recipes made for every occasion.
          </p>
          <button
            onClick={handleBrowse}
            className="px-6 py-3 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: buttonBg,
              color: "#fff",
              cursor: "pointer" // ← hand cursor added
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonBg)}
          >
            Browse Recipes
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
