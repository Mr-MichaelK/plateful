// made by Noura Hajj Chehade — FIXED FULL FAVORITES VERSION
import React, { useState, useEffect } from "react";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { API_BASE_URL } from "../apiConfig";

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const { theme } = useTheme();
  const navigate = useNavigate();

  // same as RecipeDetails
  const API_ROOT = API_BASE_URL.replace(/\/api$/, "");
  const buildImageUrl = (imgPath) => {
    if (!imgPath) return "";
    if (imgPath.startsWith("http")) return imgPath;
    return `${API_ROOT}${imgPath}`;
  };

  // ---------------- LOAD FAVORITES THEN LOAD FULL RECIPE DATA ----------------
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // 1) Get list of titles
        const res = await fetch(`${API_BASE_URL}/favorites`);
        const favTitles = await res.json();  // example: [{ title: "Chickpea Veggie Patties" }]

        // 2) Fetch full recipe data for each title
        const recipePromises = favTitles.map(async (f) => {
          const res = await fetch(
            `${API_BASE_URL}/recipes/${encodeURIComponent(f.title)}`
          );
          return res.ok ? res.json() : null;
        });

        const fullRecipes = (await Promise.all(recipePromises)).filter(Boolean);
        setFavorites(fullRecipes);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    };

    loadFavorites();
  }, []);

  // -------------------- DELETE FAVORITE --------------------
  const handleDelete = async (title) => {
    try {
      await fetch(`${API_BASE_URL}/favorites/${encodeURIComponent(title)}`, {
        method: "DELETE",
      });

      setFavorites((prev) => prev.filter((item) => item.title !== title));

      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "Recipe removed from favorites",
        confirmButtonColor: "#7a1f2a",
      });
    } catch (err) {
      console.error("Failed to delete favorite:", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Could not remove recipe. Try again.",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  const handleCardClick = (title) => {
    navigate(`/recipe/${encodeURIComponent(title)}`);
  };

  // -------------------- THEME COLORS --------------------
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fffaf6";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const titleColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e5e5e5" : "#444";
  const buttonBg = "#7a1f2a";
  const buttonText = "#fff";

  return (
    <>
      <Header />

      {/* HERO */}
      <section
        className="relative py-16 px-6 text-center overflow-hidden"
        style={{ backgroundColor: sectionBg }}
      >
        <img
          src="/recipes/top-image2.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-3" style={{ color: titleColor }}>
            Your Favorite Recipes
          </h1>
          <p className="text-lg" style={{ color: textColor }}>
            All the dishes you love saved in one place
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section
        className="py-16 px-6 min-h-screen"
        style={{ backgroundColor: sectionBg }}
      >
        {favorites.length === 0 ? (
          <p className="text-center text-lg" style={{ color: textColor }}>
            No saved recipes yet! Start adding some delicious meals!
          </p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((recipe, i) => (
              <div
                key={i}
                onClick={() => handleCardClick(recipe.title)}
                className="rounded-2xl shadow-lg hover:shadow-xl cursor-pointer overflow-hidden group"
                style={{ backgroundColor: cardBg }}
              >
                {recipe.image && (
                  <img
                    src={buildImageUrl(recipe.image)}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                )}

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1" style={{ color: titleColor }}>
                    {recipe.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: textColor }}>
                    {recipe.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(recipe.title);
                    }}
                    className="px-4 py-2 rounded-lg w-full text-sm"
                    style={{ backgroundColor: buttonBg, color: buttonText }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default FavoriteRecipes;