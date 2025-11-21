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
    navigate(`/recipe/${recipe.id || recipe.title}`, { state: { recipe } });
  };

  return (
    <>
      <Header />

      {/* HERO SECTION - matches Add/Edit recipe */}
      <section className="relative bg-[#fff8f0] py-16 px-6 text-center overflow-hidden">
        <img
          src="/recipes/top-image2.jpg"
          alt="Favorites Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#7a1f2a] mb-3 drop-shadow-md">
            Your Favorite Recipes
          </h1>
          <p className="text-gray-700 text-lg">
            All the dishes you love saved in one place
          </p>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="py-16 px-6 bg-[#fffaf6] min-h-screen">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No saved recipes yet! start adding some delicious meals!
          </p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((recipe, i) => (
              <div
                key={i}
                onClick={() => handleCardClick(recipe)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#7a1f2a] mb-1">
                    {recipe.title}
                  </h3>

                  <p className="text-gray-700 text-sm mb-4">
                    {recipe.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(recipe.title);
                    }}
                    className="bg-[#7a1f2a] text-white px-4 py-2 rounded-lg hover:bg-[#a02a3d] transition text-sm w-full"
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
