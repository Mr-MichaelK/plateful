// made by Noura Hajj Chehade — Backend Integrated Version (FormData + real upload)
import React, { useState, useEffect } from "react";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

const AddEditRecipe = () => {
  const { theme } = useTheme();
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

  // backend root (to display /uploads/... correctly)
  const API_ROOT = API_BASE_URL.replace(/\/api$/, "");

  const buildImageUrl = (imgPath) => {
    if (!imgPath) return "";
    if (imgPath.startsWith("http")) return imgPath;
    return `${API_ROOT}${imgPath}`;
  };

  // ---------------------- LOAD RECIPE TO EDIT ----------------------
  useEffect(() => {
    const loadRecipe = async () => {
      if (!editingTitle) return;

      try {
        const res = await fetch(
          `${API_BASE_URL}/recipes/${encodeURIComponent(editingTitle)}`
        );
        if (!res.ok) return;

        const data = await res.json();

        setTitle(data.title || "");
        setDescription(data.description || "");
        setWhyLove(data.whyLove || "");

        setIngredients(
          Array.isArray(data.ingredients) ? data.ingredients.join(", ") : ""
        );
        setSteps(Array.isArray(data.steps) ? data.steps.join(". ") : "");
        setCategory(data.category || "");

        const allImgs = [
          data.image,
          ...(data.extraImages || data.images || []),
        ].filter(Boolean);

        setImage1Preview(allImgs[0] ? buildImageUrl(allImgs[0]) : "");
        setImage2Preview(allImgs[1] ? buildImageUrl(allImgs[1]) : "");
        setImage3Preview(allImgs[2] ? buildImageUrl(allImgs[2]) : "");

        // user will choose new files only if they want to change images
        setImage1File(null);
        setImage2File(null);
        setImage3File(null);
      } catch (err) {
        console.error("Error loading recipe to edit:", err);
      }
    };

    loadRecipe();
  }, [editingTitle]);

  // ---------------- IMAGE CHANGE HANDLERS ----------------
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

  // ---------------------- SUBMIT ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !whyLove) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in title, description, why you love it and category.",
        confirmButtonColor: "#7a1f2a",
      });
      return;
    }

    // For NEW recipe, main image is required
    if (!editingTitle && !image1File) {
      Swal.fire({
        icon: "warning",
        title: "Main image required",
        text: "Please upload at least the main image.",
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

      // Images (max 3) – only append if user picked a file
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
          }
        );
      } else {
        res = await fetch(`${API_BASE_URL}/recipes`, {
          method: "POST",
          body: fd,
        });
      }

      if (!res.ok) throw new Error("Failed to save recipe");

      Swal.fire({
        icon: "success",
        title: "Recipe Saved!",
        text: `Your ${category} recipe "${title}" has been saved successfully!`,
        confirmButtonColor: "#7a1f2a",
      });

      if (!editingTitle) {
        setTitle("");
        setDescription("");
        setWhyLove("");
        setIngredients("");
        setSteps("");
        setCategory("");
        setImage1File(null);
        setImage2File(null);
        setImage3File(null);
        setImage1Preview("");
        setImage2Preview("");
        setImage3Preview("");
      }

      navigate("/recipes");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: err.message || "Could not save recipe. Please try again.",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  // ---------------------- COLORS ----------------------
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fff8f0";
  const sectionText = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const cardBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const inputBg = theme === "dark" ? "#2a2a2a" : "#ffffff";
  const inputText = theme === "dark" ? "#f2d8d8" : "#444";
  const inputBorder = theme === "dark" ? "#5a191f" : "#ccc";

  const placeholderBoxClasses =
    "w-full h-40 rounded-lg border border-dashed flex items-center justify-center text-sm";

  return (
    <>
      <Header />

      <section
        className="relative py-16 px-6 text-center overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: sectionBg, color: sectionText }}
      >
        <img
          src="/recipes/top-image.jpg"
          alt="Add Recipe Background"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-3 drop-shadow-md">
            {editingTitle ? "Edit Your Recipe" : "Share Your Favorite Recipe"}
          </h1>
          <p className="text-lg">
            {editingTitle
              ? "Update your delicious creation"
              : "Add your own recipe to inspire everyone!"}
          </p>
        </div>
      </section>

      <section
        className="py-16 px-6 transition-colors duration-300"
        style={{ backgroundColor: sectionBg }}
      >
        <div
          className="max-w-3xl mx-auto rounded-2xl shadow-lg p-8"
          style={{ backgroundColor: cardBg }}
        >
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: sectionText }}
          >
            {editingTitle ? "Edit Recipe" : "Add Recipe"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* TITLE */}
            <div>
              <label
                className="block font-semibold mb-2"
                style={{ color: sectionText }}
              >
                Recipe Title
              </label>
              <input
                type="text"
                placeholder="Enter recipe title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg px-4 py-2 focus:outline-none"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                  borderWidth: "1px",
                }}
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                className="block font-semibold mb-2"
                style={{ color: sectionText }}
              >
                Description
              </label>
              <textarea
                placeholder="Short description shown under the recipe title"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg px-4 py-2 h-24 resize-none focus:outline-none"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                  borderWidth: "1px",
                }}
              />
            </div>

            {/* WHY LOVE */}
            <div>
              <label
                className="block font-semibold mb-2"
                style={{ color: sectionText }}
              >
                Why You'll Love This Dish
              </label>
              <textarea
                placeholder="Explain why this dish is special!"
                value={whyLove}
                onChange={(e) => setWhyLove(e.target.value)}
                className="w-full rounded-lg px-4 py-2 h-24 resize-none focus:outline-none"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                  borderWidth: "1px",
                }}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label
                className="block font-semibold mb-2"
                style={{ color: sectionText }}
              >
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg px-4 py-2"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                  borderWidth: "1px",
                }}
              >
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* INGREDIENTS */}
            <div>
              <label
                className="block font-semibold mb-2"
                style={{ color: sectionText }}
              >
                Ingredients
              </label>
              <textarea
                placeholder="List ingredients (comma-separated)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full rounded-lg px-4 py-2 h-24 resize-none focus:outline-none"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                  borderWidth: "1px",
                }}
              />
            </div>

            {/* STEPS */}
            <div>
              <label
                className="block font-semibold mb-2"
                style={{ color: sectionText }}
              >
                Steps
              </label>
              <textarea
                placeholder="Write preparation steps (separate with dots)"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                className="w-full rounded-lg px-4 py-2 h-32 resize-none focus:outline-none"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                  borderWidth: "1px",
                }}
              />
            </div>

            {/* IMAGES WITH PREVIEW */}
            <div className="space-y-4">
              {/* MAIN IMAGE */}
              <div>
                <label
                  className="block font-semibold mb-2"
                  style={{ color: sectionText }}
                >
                  Main Image (required)
                </label>

                <div className="mb-2">
                  {image1Preview ? (
                    <img
                      src={image1Preview}
                      alt="Main preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <div
                      className={placeholderBoxClasses}
                      style={{ color: sectionText, borderColor: inputBorder }}
                    >
                      No image selected yet
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage1Change}
                  className="w-full"
                />
                {!editingTitle && (
                  <p className="text-xs mt-1" style={{ color: inputText }}>
                    * Required for new recipes
                  </p>
                )}
              </div>

              {/* IMAGE 2 */}
              <div>
                <label
                  className="block font-semibold mb-2"
                  style={{ color: sectionText }}
                >
                  Image 2 (optional)
                </label>

                <div className="mb-2">
                  {image2Preview ? (
                    <img
                      src={image2Preview}
                      alt="Image 2 preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <div
                      className={placeholderBoxClasses}
                      style={{ color: inputText, borderColor: inputBorder }}
                    >
                      No image selected
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage2Change}
                  className="w-full"
                />
              </div>

              {/* IMAGE 3 */}
              <div>
                <label
                  className="block font-semibold mb-2"
                  style={{ color: sectionText }}
                >
                  Image 3 (optional)
                </label>

                <div className="mb-2">
                  {image3Preview ? (
                    <img
                      src={image3Preview}
                      alt="Image 3 preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <div
                      className={placeholderBoxClasses}
                      style={{ color: inputText, borderColor: inputBorder }}
                    >
                      No image selected
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage3Change}
                  className="w-full"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg font-medium transition cursor-pointer hover:scale-102 shadow-lg"
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
