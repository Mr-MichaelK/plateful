// made by Noura Hajj Chehade

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import { mockRecipes } from "../pages/Recipes";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = mockRecipes[id];

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

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

  // ❤️ Save to favorites (localStorage)
  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    const exists = saved.find((r) => r.title === recipe.title);
    if (!exists) {
      saved.push(recipe);
      localStorage.setItem("favoriteRecipes", JSON.stringify(saved));
      Swal.fire({
        icon: "success",
        title: "Recipe Saved!",
        text: "You can find it later in your favorites ❤️",
        confirmButtonColor: "#7a1f2a",
      });
      navigate("/favorites");
    } else {
      Swal.fire({
        icon: "info",
        title: "Already Saved",
        text: "This recipe is already in your favorites!",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  // ✏️ Edit → prefill AddEditRecipe
  const handleEdit = () => {
    localStorage.setItem("editRecipe", JSON.stringify(recipe));
    navigate("/add");
  };

  // 📎 Share link
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: "info",
        title: "Link Copied!",
        text: "Recipe link copied to clipboard 📋",
        confirmButtonColor: "#7a1f2a",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Could not copy the link. Try again.",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  // 💬 Submit feedback (visual only)
  const handleFeedbackSubmit = () => {
    if (!feedback && rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please add a rating or comment before submitting 💬",
        confirmButtonColor: "#7a1f2a",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your feedback has been submitted 🌟",
      confirmButtonColor: "#7a1f2a",
    });
    setRating(0);
    setFeedback("");
  };

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#7a1f2a]/60 via-[#7a1f2a]/30 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="text-5xl font-bold drop-shadow-md mb-4">
            {recipe.title}
          </h1>
          <p className="text-lg max-w-2xl drop-shadow-sm">{recipe.description}</p>
        </div>
      </section>

      {/* Why love + actions */}
      <section className="bg-[#fffaf6] py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#7a1f2a] mb-4">
              Why You’ll Love This Dish
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">{recipe.whyLove}</p>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-[#7a1f2a] text-white px-5 py-2 rounded-lg hover:bg-[#a02a3d] transition"
              >
                Save Recipe
              </button>
              <button
                onClick={handleEdit}
                className="border border-[#7a1f2a] text-[#7a1f2a] px-5 py-2 rounded-lg hover:bg-[#7a1f2a] hover:text-white transition"
              >
                Edit
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

      {/* Ingredients & Steps */}
      <section className="py-16 px-6 bg-[#fff8f0]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-[#7a1f2a] mb-4">Ingredients</h2>
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

      {/* Similar */}
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
              <img src={sim.image} alt={sim.title} className="w-full h-40 object-cover" />
              <div className="bg-[#fffaf6] py-3 text-[#7a1f2a] font-medium">
                {sim.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Feedback */}
      <section className="bg-[#fffaf6] py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-[#7a1f2a] mb-8">Community Love</h2>

        {/* Existing feedbacks now show 5 stars */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            "So easy to follow — tastes like restaurant-quality!",
            "Perfect weeknight dinner. Everyone loved it.",
            "Simple, cozy, and absolutely delicious.",
          ].map((text, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl max-w-sm p-6 text-gray-700"
            >
              <div className="flex justify-center mb-2 text-[#FFD700] text-xl">
                {"★★★★★"}
              </div>
              <p className="italic">“{text}”</p>
            </div>
          ))}
        </div>

        {/* Add feedback */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 text-left">
          <h3 className="text-lg font-semibold text-[#7a1f2a] mb-4 text-center">
            Share your experience ✍️
          </h3>

          {/* Stars (interactive visual) */}
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-3xl ${
                  star <= rating ? "text-[#FFD700]" : "text-gray-300"
                } transition`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#7a1f2a]"
          />

          <div className="text-center mt-5">
            <button
              onClick={handleFeedbackSubmit}
              className="bg-[#7a1f2a] text-white px-6 py-2 rounded-lg hover:bg-[#a02a3d] transition"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default RecipeDetails;
