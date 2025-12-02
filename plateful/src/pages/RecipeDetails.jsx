// made by Noura Hajj Chehade
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../apiConfig";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, loading: authLoading } = useAuth();

  // HOOKS — always called
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

  // LOAD DATA
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const decoded = decodeURIComponent(id);

        const r = await fetch(`${API_BASE_URL}/recipes/${encodeURIComponent(decoded)}`);
        if (r.ok) setRecipe(await r.json());

        const all = await fetch(`${API_BASE_URL}/recipes`);
        if (all.ok) setAllRecipes(await all.json());

        const c = await fetch(`${API_BASE_URL}/comments/${encodeURIComponent(decoded)}`);
        if (c.ok) setComments(await c.json());
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    load();
  }, [id]);

  const isOwner = user && recipe && user.email === recipe.ownerEmail;

  // IMAGE LIST
  const imageList = [];
  if (recipe?.image) imageList.push(recipe.image);
  if (Array.isArray(recipe?.images))
    recipe.images.forEach((img) => img && !imageList.includes(img) && imageList.push(img));
  if (Array.isArray(recipe?.extraImages))
    recipe.extraImages.forEach((img) => img && !imageList.includes(img) && imageList.push(img));

  const mainImageUrl = buildImageUrl(imageList[0]);

  const similarRecipes = allRecipes
    .filter((r) => r.title !== recipe?.title && r.category === recipe?.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fffaf6";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const titleColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#ececec" : "#444";

  // SAVE
  const handleSave = async () => {
    if (!user)
      return Swal.fire({ icon: "info", title: "Log in to save recipes" });

    const res = await fetch(
      `${API_BASE_URL}/favorites/${encodeURIComponent(recipe.title)}`,
      { method: "POST", credentials: "include" }
    );

    if (!res.ok) return Swal.fire({ icon: "error", title: "Error saving recipe" });
    Swal.fire({ icon: "success", title: "Saved!" });
    navigate("/favorites");
  };

  // SHARE
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: recipe.title, url });
      } catch {}
    } else {
      navigator.clipboard.writeText(url);
      Swal.fire({ icon: "success", title: "Link copied!" });
    }
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

      const res = await fetch(
        `${API_BASE_URL}/recipes/${encodeURIComponent(recipe.title)}`,
        { method: "DELETE", credentials: "include" }
      );

      if (!res.ok) return Swal.fire({ icon: "error", title: "Failed to delete" });

      Swal.fire({ icon: "success", title: "Recipe deleted" });
      navigate("/recipes");
    });
  };

  // FEEDBACK
  const submitFeedback = async () => {
    if (!user) return Swal.fire({ icon: "info", title: "Log in to comment" });
    if (!feedback && rating === 0)
      return Swal.fire({ icon: "warning", title: "Add rating or text" });

    const res = await fetch(`${API_BASE_URL}/comments/${recipe.title}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment: feedback }),
    });

    const data = await res.json();
    if (!res.ok)
      return Swal.fire({ icon: "error", title: data.error || "Error" });

    if (data.comment)
      setComments((prev) => [data.comment, ...prev].slice(0, 6));

    setRating(0);
    setFeedback("");
    Swal.fire({ icon: "success", title: "Thank you!" });
  };

  // RENDER LOADING IF DATA OR AUTH IS LOADING
  if (authLoading || loading || !recipe) {
    return (
      <>
        <Header />
        <section className="py-24 min-h-screen flex justify-center items-center">
          <h2 className="text-3xl font-semibold">Loading recipe…</h2>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative h-[60vh] sm:h-[65vh] overflow-hidden">
        <img src={mainImageUrl} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#7a1f2a]/75 to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl sm:text-6xl font-bold mb-2">{recipe.title}</h1>
          {recipe.category && (
            <span className="mb-3 px-4 py-1 text-sm rounded-full bg-white/20 border border-white/40">
              {recipe.category}
            </span>
          )}
          <p className="max-w-2xl text-lg sm:text-xl opacity-90">{recipe.description}</p>
        </div>
      </section>

      {/* 3 IMAGES */}
      <section className="py-12 px-6" style={{ backgroundColor: sectionBg }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {imageList.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={buildImageUrl(img)}
              className="w-full h-64 object-cover rounded-xl shadow"
            />
          ))}
        </div>
      </section>

      {/* DETAILS SECTION */}
      <section className="py-20 px-6" style={{ backgroundColor: sectionBg }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* WHY */}
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: titleColor }}>
              Why You’ll Love This Dish
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: textColor }}>
              {recipe.whyLove}
            </p>

            {user ? (
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-lg text-white"
                  style={{ backgroundColor: "#7a1f2a" }}
                >
                  Save
                </button>

                <button
                  onClick={handleShare}
                  className="px-6 py-2 rounded-lg border"
                  style={{ color: "#7a1f2a", borderColor: "#7a1f2a" }}
                >
                  Share
                </button>

                {isOwner && (
                  <>
                    <button
                      onClick={() => navigate(`/add?title=${encodeURIComponent(recipe.title)}`)}
                      className="px-6 py-2 rounded-lg border"
                      style={{ color: "#7a1f2a", borderColor: "#7a1f2a" }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={handleDelete}
                      className="px-6 py-2 rounded-lg border"
                      style={{ color: "#7a1f2a", borderColor: "#7a1f2a" }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p className="italic text-sm mt-3" style={{ color: textColor }}>
                Log in to save or share this recipe.
              </p>
            )}
          </div>

          {/* INGREDIENTS */}
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: titleColor }}>
              Ingredients
            </h2>
            <ul
              className="p-6 rounded-xl shadow text-base space-y-2"
              style={{ backgroundColor: cardBg, color: textColor }}
            >
              {recipe.ingredients?.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* STEPS */}
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: titleColor }}>
              Steps
            </h2>
            <ol
              className="p-6 rounded-xl shadow text-base space-y-2 list-decimal list-inside"
              style={{ backgroundColor: cardBg, color: textColor }}
            >
              {recipe.steps?.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SIMILAR RECIPES */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: sectionBg }}>
        <h2 className="text-3xl font-bold mb-12" style={{ color: titleColor }}>
          Discover Similar Recipes
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          {similarRecipes.map((sim, i) => (
            <div
              key={i}
              onClick={() => navigate(`/recipe/${encodeURIComponent(sim.title)}`)}
              className="rounded-xl shadow hover:scale-105 transition overflow-hidden cursor-pointer"
              style={{ backgroundColor: cardBg }}
            >
              <img src={buildImageUrl(sim.image)} className="w-full h-48 object-cover" />
              <div className="py-4 font-semibold text-lg" style={{ color: titleColor }}>
                {sim.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEEDBACK SECTION */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: sectionBg }}>
        <h2 className="text-3xl font-bold mb-10" style={{ color: titleColor }}>
          Community Love
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {comments.length === 0 ? (
            <p className="text-lg" style={{ color: textColor }}>No feedback yet.</p>
          ) : (
            comments.slice(0, showAllComments ? 6 : 3).map((c, i) => (
              <div
                key={i}
                className="max-w-xs p-6 rounded-xl shadow"
                style={{ backgroundColor: cardBg, color: textColor }}
              >
                <div className="flex justify-center text-xl mb-2">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className={s <= c.rating ? "text-[#FFD700]" : "text-gray-300"}>★</span>
                  ))}
                </div>
                {c.comment && <p className="italic text-base">“{c.comment}”</p>}
                {c.createdAt && (
                  <p className="mt-3 text-xs opacity-70">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {comments.length > 3 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-sm underline mb-10"
            style={{ color: titleColor }}
          >
            {showAllComments ? "Show Less" : "Show More"}
          </button>
        )}

        {user && (
          <div
            className="max-w-md mx-auto p-6 rounded-xl shadow"
            style={{ backgroundColor: cardBg }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: titleColor }}>
              Share your experience ✍️
            </h3>

            <div className="flex justify-center mb-4">
              {[1,2,3,4,5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-3xl ${
                    star <= rating ? "text-[#FFD700]" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="w-full p-3 rounded-lg border h-28 text-base"
              placeholder="Write something…"
              style={{ backgroundColor: cardBg, color: textColor, borderColor: "#ccc" }}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button
              onClick={submitFeedback}
              className="px-6 py-2 mt-5 rounded-lg text-white"
              style={{ backgroundColor: "#7a1f2a" }}
            >
              Submit
            </button>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default RecipeDetails;
