// FeaturedRecipes.jsx — made by Adam Abdel Karim, backend-connected version
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useTheme } from "../context/ThemeContext";

const FeaturedRecipes = () => {
  const { theme } = useTheme();
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Colors
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fffdf9";
  const sectionText = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const cardBg = theme === "dark" ? "#262626" : "#fff0e5";
  const cardHover = theme === "dark" ? "#2f2f2f" : "#f5e8de";

  // Fetch featured recipes from backend
  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("http://localhost:5001/api/recipes/featured");
        const data = await res.json();
        setFeaturedRecipes(data);
      } catch (err) {
        console.error("Failed to fetch featured recipes:", err);
        setFeaturedRecipes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section
        className="py-14 px-6 text-center"
        style={{ backgroundColor: sectionBg }}
      >
        <h2 className="text-2xl font-bold mb-8" style={{ color: sectionText }}>
          Featured Recipes
        </h2>
        <p style={{ color: sectionText }}>Loading...</p>
      </section>
    );
  }

  if (!featuredRecipes.length) {
    return (
      <section
        className="py-14 px-6 text-center"
        style={{ backgroundColor: sectionBg }}
      >
        <h2 className="text-2xl font-bold mb-8" style={{ color: sectionText }}>
          Featured Recipes
        </h2>
        <p style={{ color: sectionText }}>No featured recipes available.</p>
      </section>
    );
  }

  return (
    <section
      className="py-14 px-6 text-center"
      style={{ backgroundColor: sectionBg }}
    >
      <h2 className="text-2xl font-bold mb-8" style={{ color: sectionText }}>
        Featured Recipes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredRecipes.map((recipe, i) => (
          <div
            key={i}
            className="rounded-lg shadow cursor-pointer transition duration-300 hover:shadow-lg h-full"
          >
            <RecipeCard recipe={recipe} theme={theme} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;
