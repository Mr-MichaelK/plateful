// made by Noura Hajj Chehade
import React, { useState, useEffect } from "react";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    setFavorites(saved);
  }, []);

  const handleDelete = (title) => {
    const updated = favorites.filter((r) => r.title !== title);
    setFavorites(updated);
    localStorage.setItem("favoriteRecipes", JSON.stringify(updated));

    Swal.fire({
      icon: "success",
      title: "Removed!",
      text: "Recipe removed from favorites",
      confirmButtonColor: "#7a1f2a",
    });
  };

  const handleCardClick = (recipe) => {
    navigate(`/recipe/${recipe.id || recipe.title}`, { state: { recipe } });
  };

  // Dark mode colors
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fffaf6";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const titleColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e5e5e5" : "#444";
  const buttonBg = theme === "dark" ? "#7a1f2a" : "#7a1f2a";
  const buttonText = theme === "dark" ? "#fff" : "#fff";

  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section
        className="relative py-16 px-6 text-center overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: sectionBg }}
      >
        <img
          src="/recipes/top-image2.jpg"
          alt="Favorites Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="text-4xl font-bold mb-3 drop-shadow-md"
            style={{ color: titleColor }}
          >
            Your Favorite Recipes
          </h1>
          <p className="text-lg" style={{ color: textColor }}>
            All the dishes you love saved in one place
          </p>
        </div>
      </section>

      {/* MAIN GRID */}
      <section
        className="py-16 px-6 min-h-screen transition-colors duration-300"
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
                onClick={() => handleCardClick(recipe)}
                className="rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
                style={{ backgroundColor: cardBg }}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

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
                    className="px-4 py-2 rounded-lg w-full text-sm transition"
                    style={{
                      backgroundColor: buttonBg,
                      color: buttonText,
                    }}
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
