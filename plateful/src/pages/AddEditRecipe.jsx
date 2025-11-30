// made by Noura Hajj Chehade — FINAL STRICT AUTH + OWNER (FULL FIXED)
import React, { useState, useEffect } from "react";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../apiConfig";

const AddEditRecipe = () => {
  const { theme } = useTheme();
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const editingTitle = searchParams.get("title");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [whyLove, setWhyLove] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");

  const [image1File, setImage1File] = useState(null);
  const [image2File, setImage2File] = useState(null);
  const [image3File, setImage3File] = useState(null);

  const [image1Preview, setImage1Preview] = useState("");
  const [image2Preview, setImage2Preview] = useState("");
  const [image3Preview, setImage3Preview] = useState("");

  const categories = [
    { name: "Breakfast" },
    { name: "Lunch" },
    { name: "Dinner" },
    { name: "Dessert" },
    { name: "Smoothies" },
  ];

  const API_ROOT = API_BASE_URL.replace(/\/api$/, "");
  const buildImageUrl = (imgPath) =>
    !imgPath
      ? ""
      : imgPath.startsWith("http")
      ? imgPath
      : `${API_ROOT}${imgPath}`;

  // AUTH REDIRECT (only after auth finished)
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login required",
        text: "Please log in to add or edit recipes.",
        confirmButtonColor: "#7a1f2a",
      });
      navigate("/log-in");
    }
  }, [authLoading, user, navigate]);

  // LOAD EXISTING RECIPE WHEN EDITING
  useEffect(() => {
    if (!editingTitle) return;
    if (authLoading) return;
    if (!user) return;

    const loadRecipe = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/recipes/${encodeURIComponent(editingTitle)}`
        );
        if (!res.ok) return;

        const data = await res.json();

        // OWNER CHECK
        if (data.ownerEmail !== user.email) {
          Swal.fire({
            icon: "error",
            title: "Access denied",
            text: "You can only edit your own recipes.",
            confirmButtonColor: "#7a1f2a",
          });
          navigate("/recipes");
          return;
        }

        setTitle(data.title || "");
        setDescription(data.description || "");
        setWhyLove(data.whyLove || "");
        setIngredients(
          Array.isArray(data.ingredients) ? data.ingredients.join(", ") : ""
        );
        setSteps(Array.isArray(data.steps) ? data.steps.join(". ") : "");
        setCategory(data.category || "");

        const imgs = [data.image, ...(data.extraImages || [])].filter(Boolean);
        setImage1Preview(imgs[0] ? buildImageUrl(imgs[0]) : "");
        setImage2Preview(imgs[1] ? buildImageUrl(imgs[1]) : "");
        setImage3Preview(imgs[2] ? buildImageUrl(imgs[2]) : "");
      } catch (err) {
        console.error("Error loading recipe:", err);
      }
    };

    loadRecipe();
  }, [editingTitle, user, authLoading, navigate]);

  // IMAGE HANDLERS
  const handleImage1Change = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage1File(file);
      setImage1Preview(URL.createObjectURL(file));
    }
  };

  const handleImage2Change = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage2File(file);
      setImage2Preview(URL.createObjectURL(file));
    }
  };

  const handleImage3Change = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage3File(file);
      setImage3Preview(URL.createObjectURL(file));
    }
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !whyLove) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all required fields.",
        confirmButtonColor: "#7a1f2a",
      });
      return;
    }

    if (!editingTitle && !image1File) {
      Swal.fire({
        icon: "warning",
        title: "Main image required",
        confirmButtonColor: "#7a1f2a",
      });
      return;
    }

    const ingredientsArray = ingredients
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const stepsArray = steps
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("category", category);
      fd.append("whyLove", whyLove);
      fd.append("ingredients", JSON.stringify(ingredientsArray));
      fd.append("steps", JSON.stringify(stepsArray));

      if (image1File) fd.append("images", image1File);
      if (image2File) fd.append("images", image2File);
      if (image3File) fd.append("images", image3File);

      let res;
      if (editingTitle) {
        res = await fetch(
          `${API_BASE_URL}/recipes/${encodeURIComponent(editingTitle)}`,
          {
            method: "PUT",
            body: fd,
            credentials: "include",
          }
        );
      } else {
        res = await fetch(`${API_BASE_URL}/recipes`, {
          method: "POST",
          body: fd,
          credentials: "include",
        });
      }

      if (!res.ok) throw new Error("Failed to save recipe");

      Swal.fire({
        icon: "success",
        title: editingTitle ? "Recipe Updated!" : "Recipe Added!",
        confirmButtonColor: "#7a1f2a",
      });

      navigate("/recipes");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong.",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  // THEME COLORS
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fff8f0";
  const sectionText = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const inputBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const inputText = theme === "dark" ? "#f2d8d8" : "#444";
  const inputBorder = theme === "dark" ? "#5a191f" : "#ccc";

  const placeholder = (text) => (
    <div
      className="w-full h-40 rounded-lg border border-dashed flex items-center justify-center text-sm"
      style={{ color: inputText, borderColor: inputBorder }}
    >
      {text}
    </div>
  );

  if (authLoading) return null;

  return (
    <>
      <Header />

      {/* HERO */}
      <section
        className="relative py-16 px-6 text-center"
        style={{ backgroundColor: sectionBg, color: sectionText }}
      >
        <img
          src="/recipes/top-image.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          alt=""
        />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold">
            {editingTitle ? "Edit Your Recipe" : "Add a New Recipe"}
          </h1>
        </div>
      </section>

      {/* FORM */}
      <section className="py-16 px-6" style={{ backgroundColor: sectionBg }}>
        <div
          className="max-w-3xl mx-auto rounded-2xl shadow-lg p-8"
          style={{ backgroundColor: cardBg }}
        >
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: sectionText }}
          >
            {editingTitle ? "Edit Recipe" : "New Recipe"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* TITLE */}
            <div>
              <label
                style={{ color: sectionText }}
                className="block font-semibold mb-2"
              >
                Recipe Title
              </label>
              <input
                className="w-full rounded-lg px-4 py-2 border"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                style={{ color: sectionText }}
                className="block font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                className="w-full rounded-lg px-4 py-2 h-24 resize-none border"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* WHY LOVE */}
            <div>
              <label
                style={{ color: sectionText }}
                className="block font-semibold mb-2"
              >
                Why You’ll Love It
              </label>
              <textarea
                className="w-full rounded-lg px-4 py-2 h-24 resize-none border"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                }}
                value={whyLove}
                onChange={(e) => setWhyLove(e.target.value)}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label
                style={{ color: sectionText }}
                className="block font-semibold mb-2"
              >
                Category
              </label>
              <select
                className="w-full rounded-lg px-4 py-2 border"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* INGREDIENTS */}
            <div>
              <label
                style={{ color: sectionText }}
                className="block font-semibold mb-2"
              >
                Ingredients (comma-separated)
              </label>
              <textarea
                className="w-full rounded-lg px-4 py-2 h-24 resize-none border"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                }}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>

            {/* STEPS */}
            <div>
              <label
                style={{ color: sectionText }}
                className="block font-semibold mb-2"
              >
                Steps (separated by dots)
              </label>
              <textarea
                className="w-full rounded-lg px-4 py-2 h-32 resize-none border"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                }}
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
              />
            </div>

            {/* IMAGES */}
            <div className="space-y-6">
              {/* MAIN IMAGE */}
              <div>
                <label
                  style={{ color: sectionText }}
                  className="block font-semibold mb-2"
                >
                  Main Image {editingTitle ? "(optional)" : "(required)"}
                </label>

                {image1Preview ? (
                  <img
                    src={image1Preview}
                    className="w-full h-40 rounded-lg object-cover mb-2"
                    alt="Main preview"
                  />
                ) : (
                  placeholder("No image selected")
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage1Change}
                />
              </div>

              {/* IMAGE 2 */}
              <div>
                <label
                  style={{ color: sectionText }}
                  className="block font-semibold mb-2"
                >
                  Image 2 (optional)
                </label>

                {image2Preview ? (
                  <img
                    src={image2Preview}
                    className="w-full h-40 rounded-lg object-cover mb-2"
                    alt="Second preview"
                  />
                ) : (
                  placeholder("No image selected")
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage2Change}
                />
              </div>

              {/* IMAGE 3 */}
              <div>
                <label
                  style={{ color: sectionText }}
                  className="block font-semibold mb-2"
                >
                  Image 3 (optional)
                </label>

                {image3Preview ? (
                  <img
                    src={image3Preview}
                    className="w-full h-40 rounded-lg object-cover mb-2"
                    alt="Third preview"
                  />
                ) : (
                  placeholder("No image selected")
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage3Change}
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition cursor-pointer"
                style={{
                  backgroundColor: sectionText,
                  color: theme === "dark" ? "#1a1a1a" : "#fff",
                }}
              >
                {editingTitle ? "Update Recipe" : "Save Recipe"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AddEditRecipe;
