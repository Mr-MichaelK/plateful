// made by Noura Hajj Chehade — FINAL STRICT MODE (auth + owner logic)
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../Auth/AuthContext";
import { API_BASE_URL } from "../apiConfig";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, loading: authLoading } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  const API_ROOT = API_BASE_URL.replace(/\/api$/, "");
  const buildImageUrl = (imgPath) =>
    !imgPath ? "" : imgPath.startsWith("http") ? imgPath : `${API_ROOT}${imgPath}`;

  // WAIT FOR AUTH
  if (authLoading) return null;

  // LOAD DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const decoded = decodeURIComponent(id);

        const r = await fetch(`${API_BASE_URL}/recipes/${encodeURIComponent(decoded)}`);
        if (r.ok) setRecipe(await r.json());

        const all = await fetch(`${API_BASE_URL}/recipes`);
        if (all.ok) setAllRecipes(await all.json());

        const c = await fetch(`${API_BASE_URL}/comments/${encodeURIComponent(decoded)}`);
        if (c.ok) setComments(await c.json());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <section className="py-20 min-h-screen flex items-center justify-center">
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
        <section className="py-20 min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-bold">Recipe not found</h2>
        </section>
        <Footer />
      </>
    );
  }

  // OWNER CHECK
  const isOwner = user && user.email === recipe.ownerEmail;

  // IMAGES
  const imageList = [];
  if (recipe.image) imageList.push(recipe.image);
  if (Array.isArray(recipe.images)) {
    recipe.images.forEach((img) => img && !imageList.includes(img) && imageList.push(img));
  }
  if (Array.isArray(recipe.extraImages)) {
    recipe.extraImages.forEach((img) => img && !imageList.includes(img) && imageList.push(img));
  }

  const mainImageUrl = buildImageUrl(imageList[0]);

  // SIMILAR RECIPES
  const similarRecipes = allRecipes
    .filter((r) => r.title !== recipe.title && r.category === recipe.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fffaf6";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const titleColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e5e5e5" : "#444";

  // SAVE
  const handleSave = async () => {
    if (!user) {
      Swal.fire({ icon: "info", title: "Please log in to save recipes" });
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/favorites/${encodeURIComponent(recipe.title)}`,
        { method: "POST", credentials: "include" }
      );
      const data = await res.json();

      if (!res.ok) {
        Swal.fire({ icon: "error", title: data.error || "Error saving recipe" });
        return;
      }

      Swal.fire({ icon: "success", title: "Recipe saved!" });
      navigate("/favorites");
    } catch {
      Swal.fire({ icon: "error", title: "Error saving recipe" });
    }
  };

  // EDIT
  const handleEdit = () => {
    if (isOwner) navigate(`/add?title=${encodeURIComponent(recipe.title)}`);
  };

  // DELETE
  const handleDelete = async () => {
    if (!isOwner) return;

    Swal.fire({
      icon: "warning",
      title: "Delete this recipe?",
      showCancelButton: true,
      confirmButtonColor: "#7a1f2a",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const res = await fetch(
          `${API_BASE_URL}/recipes/${encodeURIComponent(recipe.title)}`,
          { method: "DELETE", credentials: "include" }
        );

        if (!res.ok) {
          const data = await res.json();
          Swal.fire({ icon: "error", title: data.error || "Failed to delete" });
          return;
        }

        Swal.fire({ icon: "success", title: "Recipe deleted!" });
        navigate("/recipes");
      } catch {
        Swal.fire({ icon: "error", title: "Failed to delete" });
      }
    });
  };

  // ⭐ SHARE FEATURE
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: "Check out this recipe on Plateful!",
          url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(url);
      Swal.fire({
        icon: "success",
        title: "Link copied!",
        text: "You can now share it anywhere.",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  // FEEDBACK
  const handleFeedbackSubmit = async () => {
    if (!user) {
      Swal.fire({ icon: "info", title: "Log in to leave feedback" });
      return;
    }
    if (!feedback && rating === 0) {
      Swal.fire({ icon: "warning", title: "Add rating or comment first" });
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/comments/${encodeURIComponent(recipe.title)}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, comment: feedback }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({ icon: "error", title: data.error || "Couldn't send feedback" });
        return;
      }

      if (data.comment)
        setComments((prev) => [data.comment, ...prev].slice(0, 6));

      Swal.fire({ icon: "success", title: "Thank you!" });
      setRating(0);
      setFeedback("");
    } catch {
      Swal.fire({ icon: "error", title: "Couldn't send feedback" });
    }
  };

  const limitedComments = comments.slice(0, 6);
  const visibleComments = showAllComments ? limitedComments : limitedComments.slice(0, 3);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative h-[60vh] sm:h-[65vh] overflow-hidden">
        {mainImageUrl && (
          <img src={mainImageUrl} alt={recipe.title} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#7a1f2a]/75 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center h-full px-4">
          <h1 className="text-3xl sm:text-5xl font-bold">{recipe.title}</h1>
          {recipe.category && (
            <span className="bg-white/20 px-4 py-1 rounded-full text-xs sm:text-sm mb-3 border border-white/40">
              {recipe.category}
            </span>
          )}
          <p className="max-w-2xl text-sm sm:text-lg">{recipe.description}</p>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-16 px-6" style={{ backgroundColor: sectionBg }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-10">

          {/* WHY + BUTTONS */}
          <div className="lg:border-r border-[#e0d3cd] lg:pr-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>
              Why You’ll Love This Dish
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: textColor }}>
              {recipe.whyLove || "This dish is flavorful and easy to prepare!"}
            </p>

            {user ? (
              <div className="flex flex-wrap gap-3">

                {/* SAVE */}
                <button
                  onClick={handleSave}
                  className="px-5 py-2 rounded-lg text-white"
                  style={{ backgroundColor: "#7a1f2a" }}
                >
                  Save
                </button>

                {/* SHARE (always available to logged-in users) */}
                <button
                  onClick={handleShare}
                  className="px-5 py-2 rounded-lg border"
                  style={{ borderColor: "#7a1f2a", color: "#7a1f2a" }}
                >
                  Share
                </button>

                {/* OWNER BUTTONS */}
                {isOwner && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="px-5 py-2 rounded-lg border"
                      style={{ borderColor: "#7a1f2a", color: "#7a1f2a" }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={handleDelete}
                      className="px-5 py-2 rounded-lg border"
                      style={{ borderColor: "#7a1f2a", color: "#7a1f2a" }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p className="italic mt-4 text-sm" style={{ color: textColor }}>
                Log in to save, share, or leave feedback.
              </p>
            )}
          </div>

          {/* INGREDIENTS */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>Ingredients</h2>
            <ul className="p-5 shadow rounded-xl space-y-1 text-sm" style={{ backgroundColor: cardBg, color: textColor }}>
              {recipe.ingredients?.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* STEPS */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>Steps</h2>
            <ol className="p-5 shadow rounded-xl text-sm space-y-1 list-decimal list-inside" style={{ backgroundColor: cardBg, color: textColor }}>
              {recipe.steps?.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SIMILAR RECIPES */}
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
                  onClick={() => navigate(`/recipe/${encodeURIComponent(sim.title)}`)}
                  className="w-64 cursor-pointer rounded-xl shadow overflow-hidden hover:scale-105 transition"
                  style={{ backgroundColor: cardBg }}
                >
                  {sim.image && (
                    <img src={buildImageUrl(sim.image)} className="w-full h-40 object-cover" />
                  )}
                  <div className="py-3 font-medium" style={{ color: titleColor }}>
                    {sim.title}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: textColor }}>No similar recipes yet.</p>
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
            visibleComments.map((c, i) => (
              <div key={i} className="max-w-xs p-6 rounded-xl" style={{ backgroundColor: cardBg, color: textColor }}>
                <div className="flex justify-center text-xl mb-2">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className={s <= (c.rating || 0) ? "text-[#FFD700]" : "text-gray-300"}>
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

        {/* TOGGLE */}
        {limitedComments.length > 3 && (
          <button
            onClick={() => setShowAllComments((x) => !x)}
            className="text-sm underline cursor-pointer mb-10"
            style={{ color: titleColor }}
          >
            {showAllComments ? "Show less..." : "Show more..."}
          </button>
        )}

        {/* FEEDBACK FORM */}
        {user && (
          <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg" style={{ backgroundColor: cardBg }}>
            <h3 className="text-lg font-semibold text-center mb-4" style={{ color: titleColor }}>
              Share your experience ✍️
            </h3>

            {/* STARS */}
            <div className="flex justify-center mb-4">
              {[1,2,3,4,5].map((star) => (
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
                backgroundColor: cardBg,
                color: textColor,
                borderColor: theme === "dark" ? "#444" : "#ccc",
              }}
            />

            <div className="text-center mt-5">
              <button
                onClick={handleFeedbackSubmit}
                className="px-6 py-2 rounded-lg text-white"
                style={{ backgroundColor: "#7a1f2a" }}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default RecipeDetails;