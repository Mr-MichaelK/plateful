// this file is done by Adam (but Noura copy paste it)
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const categories = [
  { name: "Breakfast", image: "/categories/breakfast.jpg" },
  { name: "Lunch", image: "/categories/lunch.jpg" },
  { name: "Dinner", image: "/categories/dinner.jpg" },
  { name: "Dessert", image: "/categories/dessert.jpg" },
  { name: "Smoothies", image: "/categories/smoothie.jpg" },
];

const CategoriesSection = () => {
  const navigate = useNavigate();
 const { theme, toggleTheme } = useTheme();

  const handleCategoryClick = (category) => {
    navigate(`/recipes?category=${category}`);
  };

  // Custom section-specific colors
  const sectionBg = theme === "dark" ? "#1f1f1f" : "#fdf8f3"; // dark gray vs light cream
  const sectionText = theme === "dark" ? "#f2d8d8" : "#7a1f2a"; // light pink vs brown
  const cardBg = theme === "dark" ? "#2a2a2a" : "#fff0e5"; // card background
  const cardHover = theme === "dark" ? "#343434" : "#f5e8de"; // card hover
  const overlay = theme === "dark" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.4)"; // image overlay

  return (
    <section
      className="py-14 px-6 text-center transition-colors duration-300"
      style={{ backgroundColor: sectionBg }}
    >
      <h2
        className="text-2xl font-bold mb-8 transition-colors duration-300"
        style={{ color: sectionText }}
      >
        Explore by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleCategoryClick(cat.name)}
            className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
            style={{ backgroundColor: cardBg }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-28 object-cover transition duration-300"
              style={{
                filter: theme === "dark" ? "brightness(85%)" : "brightness(100%)",
              }}
            />

            <div
              className="absolute inset-0 flex items-center justify-center font-semibold text-sm transition-colors duration-300"
              style={{ backgroundColor: overlay, color: "#fff" }}
            >
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
