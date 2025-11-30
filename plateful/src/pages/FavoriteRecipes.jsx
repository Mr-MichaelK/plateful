// made by Noura Hajj Chehade — FINAL STRICT AUTH FAVORITES (fixed auth timing)
import React, { useState, useEffect } from "react";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../apiConfig";

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const { theme } = useTheme();
  const { user, loading: authLoading } = useAuth(); // FIXED: use authLoading
  const navigate = useNavigate();
  const location = useLocation();

  // Build image URL
  const API_ROOT = API_BASE_URL.replace(/\/api$/, "");
  const buildImageUrl = (imgPath) => {
    if (!imgPath) return "";
    if (imgPath.startsWith("http")) return imgPath;
    return `${API_ROOT}${imgPath}`;
  };

  useEffect(() => {
    if (authLoading) return; // WAIT for auth to finish

    if (!user) {
      // Avoid redirect loop
      if (location.pathname !== "/log-in") {
        Swal.fire({
          icon: "info",
          title: "You must log in first",
          confirmButtonColor: "#7a1f2a",
        });
        navigate("/log-in");
      }
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (authLoading) return; // wait
    if (!user) return;

    const loadFavorites = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/favorites`, {
          credentials: "include",
        });

        if (!res.ok) return;

        const favoriteTitles = await res.json();

        const recipePromises = favoriteTitles.map(async (fav) => {
          const r = await fetch(
            `${API_BASE_URL}/recipes/${encodeURIComponent(fav.title)}`
          );
          return r.ok ? r.json() : null;
        });

        const fullRecipes = (await Promise.all(recipePromises)).filter(Boolean);
        setFavorites(fullRecipes);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    };

    loadFavorites();
  }, [authLoading, user]);

  // ---------------------- REMOVE ----------------------
  const handleDelete = async (title) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/favorites/${encodeURIComponent(title)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Could not remove recipe",
          confirmButtonColor: "#7a1f2a",
        });
        return;
      }

      setFavorites((prev) => prev.filter((item) => item.title !== title));

      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "Recipe removed from favorites",
        confirmButtonColor: "#7a1f2a",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to remove recipe",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  const handleCardClick = (title) => {
    navigate(`/recipe/${encodeURIComponent(title)}`);
  };

  // THEME COLORS
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fffaf6";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const titleColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e5e5e5" : "#444";

  if (authLoading) return null; // FIX: wait for auth

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
            No saved recipes yet — start exploring!
          </p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((recipe, i) => (
              <div
                key={i}
                onClick={() => handleCardClick(recipe.title)}
                className="rounded-2xl shadow-lg hover:shadow-xl cursor-pointer overflow-hidden group flex flex-col h-full"
                style={{ backgroundColor: cardBg }}
              >
                {recipe.image && (
                  <img
                    src={buildImageUrl(recipe.image)}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                )}

                <div className="p-5 flex flex-col flex-grow">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: titleColor }}
                  >
                    {recipe.title}
                  </h3>

                  <p
                    className="text-sm mb-4 flex-grow"
                    style={{ color: textColor }}
                  >
                    {recipe.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(recipe.title);
                    }}
                    className="px-4 py-2 rounded-lg w-full text-sm cursor-pointer"
                    style={{ backgroundColor: "#7a1f2a", color: "#fff" }}
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
