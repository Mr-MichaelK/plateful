// made by Noura Hajj Chehade — Backend Integrated Version
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

  // ---------------------- STATES ----------------------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [whyLove, setWhyLove] = useState("");  
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  const categories = [
    { name: "Breakfast" },
    { name: "Lunch" },
    { name: "Dinner" },
    { name: "Dessert" },
    { name: "Smoothies" },
  ];

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
          Array.isArray(data.ingredients)
            ? data.ingredients.join(", ")
            : ""
        );
        setSteps(
          Array.isArray(data.steps)
            ? data.steps.join(". ")
            : ""
        );
        setCategory(data.category || "");

        if (Array.isArray(data.images)) {
          setImage1(data.images[0] || "");
          setImage2(data.images[1] || "");
          setImage3(data.images[2] || "");
        }
      } catch (err) {
        console.error("Error loading recipe to edit:", err);
      }
    };

    loadRecipe();
  }, [editingTitle]);

  // ---------------------- SUBMIT ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !whyLove) {   
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in title, description, why you love it, category & images.",
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

    const imagesArray = [image1, image2, image3].filter(Boolean);

    if (imagesArray.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Images Missing",
        text: "Please enter all 3 image URLs.",
        confirmButtonColor: "#7a1f2a",
      });
      return;
    }

    const payload = {
      title,
      description,
      whyLove,              
      category,
      image: imagesArray[0],
      images: imagesArray,
      ingredients: ingredientsArray,
      steps: stepsArray,
    };

    try {
      let res;

      if (editingTitle) {
        res = await fetch(
          `${API_BASE_URL}/recipes/${encodeURIComponent(editingTitle)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        res = await fetch(`${API_BASE_URL}/recipes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
        setImage1("");
        setImage2("");
        setImage3("");
      }

      navigate("/recipes");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Could not save recipe. Please try again.",
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
              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
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
              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
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
              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
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
              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
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
              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
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
              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
                Steps
              </label>
              <textarea
                placeholder="Write preparation steps"
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

            {/* IMAGES */}
            <div>
              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
                Image URL 1 (Main Image)
              </label>
              <input
                type="text"
                value={image1}
                onChange={(e) => setImage1(e.target.value)}
                className="w-full rounded-lg px-4 py-2 mb-4 focus:outline-none"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                  borderWidth: "1px",
                }}
              />

              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
                Image URL 2
              </label>
              <input
                type="text"
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
                className="w-full rounded-lg px-4 py-2 mb-4 focus:outline-none"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                  borderWidth: "1px",
                }}
              />

              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
                Image URL 3
              </label>
              <input
                type="text"
                value={image3}
                onChange={(e) => setImage3(e.target.value)}
                className="w-full rounded-lg px-4 py-2 focus:outline-none"
                style={{
                  backgroundColor: inputBg,
                  color: inputText,
                  borderColor: inputBorder,
                  borderWidth: "1px",
                }}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg font-medium transition"
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