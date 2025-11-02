// made by Noura Hajj Chehade
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../shared-components/Header";
import { mockRecipes } from "../pages/Recipes";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = mockRecipes[id];

  if (!recipe) {
    return (
      <>
        <Header />
        <section className="py-20 text-center bg-[#fff8f0] min-h-screen">
          <h2 className="text-2xl font-bold text-[#7a1f2a]">Recipe not found</h2>
        </section>
        <Footer />
      </>
    );
  }

  const handleSave = () => {
    Swal.fire({
      icon: "success",
      title: "Recipe Saved!",
      text: "You can find it later in your favorites",
      confirmButtonColor: "#7a1f2a",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: "info",
        title: "Link Copied!",
        text: "Recipe link copied to clipboard",
        confirmButtonColor: "#7a1f2a",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Could not copy the link. Try again.",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  return (
    <>
      <Header />

      {/* --- Hero Section --- */}
      <section className="bg-[#fff8f0] py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#7a1f2a] mb-2">
            {recipe.title}
          </h1>
          {/* Category Tag */}
          <span className="inline-block bg-[#7a1f2a]/10 text-[#7a1f2a] px-3 py-1 rounded-full text-sm font-medium mb-4">
            {recipe.category}
          </span>
          <p className="text-gray-700 mb-8 text-lg">{recipe.description}</p>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="rounded-2xl shadow-lg w-full max-h-[450px] object-cover mb-12"
          />
        </div>
      </section>

      {/* --- Why You'll Love --- */}
      <section className="bg-[#fffaf6] py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#7a1f2a] mb-4">
              Why You’ll Love This Dish
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {recipe.whyLove}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-[#7a1f2a] text-white px-5 py-2 rounded-lg hover:bg-[#a02a3d] transition"
              >
                Save Recipe
              </button>
              <button
                onClick={handleShare}
                className="border border-[#7a1f2a] text-[#7a1f2a] px-5 py-2 rounded-lg hover:bg-[#7a1f2a] hover:text-white transition"
              >
                Share
              </button>
            </div>
          </div>
          <div>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="rounded-xl shadow-md w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- Ingredients & Steps --- */}
      <section className="py-16 px-6 bg-[#fff8f0]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-[#7a1f2a] mb-4">
              Ingredients
            </h2>
            <ul className="bg-white shadow rounded-xl p-5 space-y-2 text-gray-700">
              {recipe.ingredients.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#7a1f2a] mb-4">Steps</h2>
            <ol className="bg-white shadow rounded-xl p-5 space-y-2 text-gray-700 list-decimal list-inside">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* --- Similar Recipes --- */}
      <section className="bg-[#fff] py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-[#7a1f2a] mb-10">
          Discover Similar Recipes
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {recipe.similar.map((sim, i) => (
            <div
              key={i}
              onClick={() => navigate(`/recipe/${i}`)}
              className="w-64 rounded-xl overflow-hidden shadow hover:shadow-lg transition hover:scale-105 cursor-pointer"
            >
              <img
                src={sim.image}
                alt={sim.title}
                className="w-full h-40 object-cover"
              />
              <div className="bg-[#fffaf6] py-3 text-[#7a1f2a] font-medium">
                {sim.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Community Love --- */}
      <section className="bg-[#fffaf6] py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-[#7a1f2a] mb-8">
          Community Love
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white shadow rounded-xl max-w-sm p-6 text-gray-700 italic">
            “So easy to follow — tastes like restaurant-quality!”
          </div>
          <div className="bg-white shadow rounded-xl max-w-sm p-6 text-gray-700 italic">
            “Perfect weeknight dinner. Everyone loved it.”
          </div>
          <div className="bg-white shadow rounded-xl max-w-sm p-6 text-gray-700 italic">
            “Simple, cozy, and absolutely delicious.”
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default RecipeDetails;
