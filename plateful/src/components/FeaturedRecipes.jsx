// FeaturedRecipes.jsx made by Adam Abdel Karim
import React from "react";
import RecipeCard from "./RecipeCard";
import { useTheme } from "../context/ThemeContext";

export const featuredRecipes = [
  { title: "Berry Cobbler", description: "A sweet dessert with fresh berries.", image: "/recipes/berry-cobbler.jpg" },
  { title: "Chickpea Veggie Patties", description: "Crispy and protein-packed patties.", image: "/recipes/chickpea-patties.jpg" },
  { title: "Sweet Potato Hash", description: "Perfect for a colorful breakfast.", image: "/recipes/sweet-potato-hash.jpg" },
  { title: "Blueberry Smoothie", description: "Healthy and refreshing smoothie.", image: "/recipes/blueberry-smoothie.jpg" },
];

const FeaturedRecipes = () => {
  const { theme } = useTheme();

  // Custom section-specific colors
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fffdf9"; // slightly dark gray vs off-white
  const sectionText = theme === "dark" ? "#f9c8c8" : "#7a1f2a"; // light pink vs brown
  const cardBg = theme === "dark" ? "#262626" : "#fff0e5"; // card background
  const cardHover = theme === "dark" ? "#2f2f2f" : "#f5e8de"; // hover background

  return (
    <section
      className="py-14 px-6 text-center transition-colors duration-300"
      style={{ backgroundColor: sectionBg }}
    >
      <h2
        className="text-2xl font-bold mb-8 transition-colors duration-300"
        style={{ color: sectionText }}
      >
        Featured Recipes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredRecipes.map((recipe, i) => (
          <div
            key={i}
            style={{ backgroundColor: cardBg }}
            className="rounded-lg shadow cursor-pointer transition duration-300 hover:shadow-lg"
          >
            <RecipeCard recipe={recipe} id={encodeURIComponent(recipe.title)} theme={theme} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;
