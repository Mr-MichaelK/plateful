// made by Noura Hajj Chehade, Categories added by Adam
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import { mockRecipes } from "../pages/Recipes";
import { featuredRecipes } from "../components/FeaturedRecipes";
import { useTheme } from "../context/ThemeContext";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const decodedId = decodeURIComponent(id);

    let found =
      mockRecipes.find((r) => r.title === decodedId) ||
      featuredRecipes.find((r) => r.title === decodedId);

    if (!found) {
      const favorites =
        JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
      found =
        favorites.find(
          (r) => r.title === decodedId || r.id === decodedId
        ) || null;
    }

    setRecipe(found);
    window.scrollTo(0, 0);
  }, [id]);

  if (!recipe) {
    const bg = theme === "dark" ? "#1a1a1a" : "#fff8f0";
    const textColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
    return (
      <>
        <Header />
        <section
          className="py-20 text-center min-h-screen flex items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: bg }}
        >
          <h2 className="text-2xl font-bold" style={{ color: textColor }}>
            Recipe not found
          </h2>
        </section>
        <Footer />
      </>
    );
  }

  // Similar recipes
  const allRecipes = [...mockRecipes, ...featuredRecipes];
  let similarRecipes = allRecipes.filter(
    (r) => r.title !== recipe.title && r.category === recipe.category
  );
  similarRecipes = similarRecipes.sort(() => Math.random() - 0.5).slice(0, 3);

  // Dark mode colors
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fffaf6";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const titleColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e5e5e5" : "#444";

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

  const handleEdit = () => {
    localStorage.setItem("editRecipe", JSON.stringify(recipe));
    navigate("/add");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: "info",
        title: "Link Copied!",
        text: "Recipe link copied to clipboard!",
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

  const handleFeedbackSubmit = () => {
    if (!feedback && rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please add a rating or comment before submitting",
        confirmButtonColor: "#7a1f2a",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your feedback has been submitted!",
      confirmButtonColor: "#7a1f2a",
    });
    setRating(0);
    setFeedback("");
  };

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative h-[60vh] sm:h-[65vh] w-full overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#7a1f2a]/75 via-[#7a1f2a]/30 to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-md mb-3">
            {recipe.title}
          </h1>

          {recipe.category && (
            <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-xs sm:text-sm mb-4 border border-white/40">
              {recipe.category}
            </span>
          )}

          <p className="text-sm sm:text-lg max-w-2xl drop-shadow-sm">
            {recipe.description}
          </p>
        </div>
      </section>

      {/* THREE IMAGES */}
      <section className="py-10 px-6" style={{ backgroundColor: sectionBg }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <img
            src={recipe.image}
            className="w-full h-56 object-cover rounded-xl shadow"
          />
          {recipe.extraImages?.slice(0, 2).map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full h-56 object-cover rounded-xl shadow"
            />
          ))}
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-16 px-6" style={{ backgroundColor: sectionBg }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-12">
          {/* WHY */}
          <div className="pr-6 border-r border-[#e0d3cd]">
            <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>
              Why You’ll Love This Dish
            </h2>
            <p className="leading-relaxed mb-6 text-lg" style={{ color: textColor }}>
              {recipe.whyLove}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg text-white"
                style={{ backgroundColor: "#7a1f2a" }}
              >
                Save Recipe
              </button>

              <button
                onClick={handleEdit}
                className="border px-5 py-2 rounded-lg hover:text-white"
                style={{ borderColor: "#7a1f2a", color: "#7a1f2a", backgroundColor: "transparent" }}
              >
                Edit
              </button>

              <button
                onClick={handleShare}
                className="border px-5 py-2 rounded-lg hover:text-white"
                style={{ borderColor: "#7a1f2a", color: "#7a1f2a", backgroundColor: "transparent" }}
              >
                Share
              </button>
            </div>
          </div>

          {/* INGREDIENTS */}
          <div className="px-2">
            <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>
              Ingredients
            </h2>
            <ul
              className="shadow rounded-xl p-6 space-y-2 text-lg"
              style={{ backgroundColor: cardBg, color: textColor }}
            >
              {recipe.ingredients?.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* STEPS */}
          <div className="pl-2">
            <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>
              Steps
            </h2>
            <ol
              className="shadow rounded-xl p-6 space-y-2 text-lg list-decimal list-inside"
              style={{ backgroundColor: cardBg, color: textColor }}
            >
              {recipe.steps?.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SIMILAR */}
      <section className="py-16 px-6" style={{ backgroundColor: sectionBg }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10" style={{ color: titleColor }}>
            Discover Similar Recipes
          </h2>

          {similarRecipes.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {similarRecipes.map((sim, i) => (
                <div
                  key={i}
                  onClick={() =>
                    navigate(`/recipe/${encodeURIComponent(sim.title)}`)
                  }
                  className="w-64 rounded-xl overflow-hidden shadow hover:shadow-lg transition hover:scale-105 cursor-pointer"
                  style={{ backgroundColor: cardBg }}
                >
                  <img
                    src={sim.image}
                    className="w-full h-40 object-cover"
                  />
                  <div className="py-3 font-medium" style={{ color: titleColor }}>
                    {sim.title}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No similar recipes available yet.</p>
          )}
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: sectionBg }}>
        <h2 className="text-2xl font-bold mb-10" style={{ color: titleColor }}>
          Community Love
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            "So easy to follow — tastes like restaurant-quality!",
            "Perfect weeknight dinner. Everyone loved it.",
            "Simple, cozy, and absolutely delicious.",
          ].map((text, index) => (
            <div
              key={index}
              className="rounded-xl max-w-xs p-6"
              style={{ backgroundColor: cardBg, color: textColor }}
            >
              <div className="flex justify-center mb-2 text-[#FFD700] text-xl">
                ★★★★★
              </div>
              <p className="italic">“{text}”</p>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto rounded-2xl shadow-lg p-6 text-left" style={{ backgroundColor: cardBg }}>
          <h3 className="text-lg font-semibold mb-4 text-center" style={{ color: titleColor }}>
            Share your experience ✍️
          </h3>

          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-3xl ${
                  star <= rating ? "text-[#FFD700]" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2"
            style={{
              borderColor: theme === "dark" ? "#444" : "#ccc",
              backgroundColor: cardBg,
              color: textColor,
            }}
          />

          <div className="text-center mt-5">
            <button
              onClick={handleFeedbackSubmit}
              className="px-6 py-2 rounded-lg"
              style={{ backgroundColor: "#7a1f2a", color: "#fff" }}
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
