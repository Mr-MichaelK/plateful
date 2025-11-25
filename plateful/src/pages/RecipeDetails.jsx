// made by Noura Hajj Chehade — backend image upload / stable version
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { API_BASE_URL } from "../apiConfig";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  // remove /api to load uploads correctly
  const API_ROOT = API_BASE_URL.replace(/\/api$/, "");

  const buildImageUrl = (imgPath) => {
    if (!imgPath) return "";
    if (imgPath.startsWith("http")) return imgPath;
    return `${API_ROOT}${imgPath}`;
  };

  // LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const decodedId = decodeURIComponent(id);

        // Fetch recipe
        const r = await fetch(
          `${API_BASE_URL}/recipes/${encodeURIComponent(decodedId)}`
        );
        if (r.ok) setRecipe(await r.json());

        // Fetch all recipes (similar)
        const all = await fetch(`${API_BASE_URL}/recipes`);
        if (all.ok) setAllRecipes(await all.json());

        // Fetch comments
        const c = await fetch(
          `${API_BASE_URL}/comments/${encodeURIComponent(decodedId)}`
        );
        if (c.ok) setComments(await c.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchData();
  }, [id]);

  // LOADING STATE
  if (loading) {
    return (
      <>
        <Header />
        <section className="py-20 text-center min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-bold">Loading recipe…</h2>
        </section>
        <Footer />
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Header />
        <section className="py-20 text-center min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-bold">Recipe not found</h2>
        </section>
        <Footer />
      </>
    );
  }

  // ---------------------------------------------------
  // ⭐ FIXED IMAGE LOGIC — NO DUPLICATES, CORRECT ORDER
  // ---------------------------------------------------
  const imageList = [];

  // 1️⃣ Main image (always first)
  if (recipe.image) {
    imageList.push(recipe.image);
  }

  // 2️⃣ Full images array (new backend schema)
  if (Array.isArray(recipe.images)) {
    recipe.images.forEach((img) => {
      if (!imageList.includes(img)) imageList.push(img);
    });
  }

  // 3️⃣ Extra images (old backend schema)
  if (Array.isArray(recipe.extraImages)) {
    recipe.extraImages.forEach((img) => {
      if (!imageList.includes(img)) imageList.push(img);
    });
  }

  const mainImageUrl = buildImageUrl(imageList[0]);
  const extraImages = imageList.slice(1);

  // SIMILAR RECIPES
  let similarRecipes = allRecipes
    .filter((r) => r.title !== recipe.title && r.category === recipe.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // COLORS
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fffaf6";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const titleColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e5e5e5" : "#444";

  // SAVE FAVORITE
  const handleSave = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/favorites/${encodeURIComponent(recipe.title)}`,
        { method: "POST" }
      );
      const data = await res.json();

      Swal.fire({
        icon: "success",
        title:
          data.message === "Already in favorites"
            ? "Already Saved"
            : "Recipe Saved!",
        confirmButtonColor: "#7a1f2a",
      });

      if (data.message !== "Already in favorites") navigate("/favorites");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not save recipe.",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  const handleEdit = () => {
    navigate(`/add?title=${encodeURIComponent(recipe.title)}`);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: "info",
        title: "Link copied!",
        confirmButtonColor: "#7a1f2a",
      });
    } catch {}
  };

  // SUBMIT FEEDBACK
  const handleFeedbackSubmit = async () => {
    if (!feedback && rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Add rating or comment first",
        confirmButtonColor: "#7a1f2a",
      });
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/comments/${encodeURIComponent(recipe.title)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, comment: feedback }),
        }
      );

      const data = await res.json();
      if (data.comment) {
        setComments((prev) => [data.comment, ...prev].slice(0, 6));
      }

      Swal.fire({
        icon: "success",
        title: "Thank you!",
        confirmButtonColor: "#7a1f2a",
      });

      setRating(0);
      setFeedback("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Couldn't send feedback",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  const limitedComments = comments.slice(0, 6);
  const visibleComments = showAllComments
    ? limitedComments
    : limitedComments.slice(0, 3);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative h-[60vh] sm:h-[65vh] w-full overflow-hidden">
        {mainImageUrl && (
          <img
            src={mainImageUrl}
            alt={recipe.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#7a1f2a]/75 via-[#7a1f2a]/30 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="text-3xl sm:text-5xl font-bold">{recipe.title}</h1>

          {recipe.category && (
            <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-xs sm:text-sm mb-4 border border-white/40">
              {recipe.category}
            </span>
          )}

          <p className="text-sm sm:text-lg max-w-2xl">{recipe.description}</p>
        </div>
      </section>

      {/* 3 IMAGES */}
      <section className="py-10 px-6" style={{ backgroundColor: sectionBg }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {imageList.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={buildImageUrl(img)}
              alt={`extra ${i}`}
              className="w-full h-56 object-cover rounded-xl shadow"
            />
          ))}
        </div>
      </section>

      {/* WHY / INGREDIENTS / STEPS */}
      <section className="py-16 px-6" style={{ backgroundColor: sectionBg }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-10">
          {/* WHY */}
          <div className="lg:pr-6 lg:border-r border-[#e0d3cd]">
            <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>
              Why You’ll Love This Dish
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: textColor }}>
              {recipe.whyLove ||
                "This dish is flavorful and simple—perfect for any day."}
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg text-white"
                style={{ backgroundColor: "#7a1f2a" }}
              >
                Save Recipe
              </button>

              <button
                onClick={handleEdit}
                className="border px-5 py-2 rounded-lg"
                style={{ borderColor: "#7a1f2a", color: "#7a1f2a" }}
              >
                Edit
              </button>

              <button
                onClick={handleShare}
                className="border px-5 py-2 rounded-lg"
                style={{ borderColor: "#7a1f2a", color: "#7a1f2a" }}
              >
                Share
              </button>
            </div>
          </div>

          {/* INGREDIENTS */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>
              Ingredients
            </h2>
            <ul
              className="shadow rounded-xl p-5 space-y-1 text-sm"
              style={{ backgroundColor: cardBg, color: textColor }}
            >
              {recipe.ingredients?.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* STEPS */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>
              Steps
            </h2>
            <ol
              className="shadow rounded-xl p-5 space-y-1 text-sm list-decimal list-inside"
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
          <h2
            className="text-2xl font-bold mb-10"
            style={{ color: titleColor }}
          >
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
                  {sim.image && (
                    <img
                      src={buildImageUrl(sim.image)}
                      alt={sim.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="py-3 font-medium" style={{ color: titleColor }}>
                    {sim.title}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: textColor }}>No similar recipes available yet.</p>
          )}
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: sectionBg }}>
        <h2 className="text-2xl font-bold mb-10" style={{ color: titleColor }}>
          Community Love
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {visibleComments.length === 0 ? (
            <p style={{ color: textColor }}>No feedback yet.</p>
          ) : (
            visibleComments.map((c, index) => (
              <div
                key={index}
                className="rounded-xl max-w-xs p-6 text-left"
                style={{ backgroundColor: cardBg, color: textColor }}
              >
                <div className="flex justify-center mb-2 text-xl">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={
                        s <= (c.rating || 0) ? "text-[#FFD700]" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                {c.comment && <p className="italic text-sm">“{c.comment}”</p>}

                {c.createdAt && (
                  <p className="mt-3 text-xs opacity-70">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {limitedComments.length > 3 && (
          <button
            onClick={() => setShowAllComments((prev) => !prev)}
            className="mb-10 text-sm underline"
            style={{ color: titleColor }}
          >
            {showAllComments ? "Show less..." : "Show more..."}
          </button>
        )}

        {/* Submit feedback */}
        <div
          className="max-w-md mx-auto rounded-2xl shadow-lg p-6 text-left"
          style={{ backgroundColor: cardBg }}
        >
          <h3
            className="text-lg font-semibold mb-4 text-center"
            style={{ color: titleColor }}
          >
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
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none"
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