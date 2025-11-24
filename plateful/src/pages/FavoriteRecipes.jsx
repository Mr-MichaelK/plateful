// made by Noura Hajj Chehade

import React, { useState, useEffect } from "react";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

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
    // Pass the recipe data or ID when navigating
    navigate(`/recipe/${recipe.id || recipe.title}`, { state: { recipe } });
  };

  return (
    <>
      <Header />
      <section className="py-16 px-6 bg-[#fff8f0] text-center min-h-screen">
        <h2 className="text-3xl font-bold text-[#7a1f2a] mb-10">
          Your Favorite Recipes ❤️
        </h2>

        {favorites.length === 0 ? (
          <p className="text-gray-600">No saved recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((recipe, i) => (
              <div
                key={i}
                onClick={() => handleCardClick(recipe)}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative cursor-pointer group"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover group-hover:opacity-90 transition"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#7a1f2a] mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {recipe.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleDelete(recipe.title);
                    }}
                    className="bg-[#7a1f2a] text-white text-sm px-4 py-1 rounded-lg hover:bg-[#a02a3d] transition"
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
