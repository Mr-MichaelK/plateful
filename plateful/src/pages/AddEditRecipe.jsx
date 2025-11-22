// made by Noura Hajj Chehade
import React, { useState, useEffect } from "react";
import Header from "../shared-components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";

const AddEditRecipe = () => {
  const { theme } = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    { name: "Breakfast", image: "/categories/breakfast.jpg" },
    { name: "Lunch", image: "/categories/lunch.jpg" },
    { name: "Dinner", image: "/categories/dinner.jpg" },
    { name: "Dessert", image: "/categories/dessert.jpg" },
    { name: "Smoothies", image: "/categories/smoothie.jpg" },
  ];

  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem("editRecipe"));
    if (editData) {
      setTitle(editData.title || "");
      setDescription(editData.description || "");
      setIngredients(
        editData.ingredients ? editData.ingredients.join(", ") : ""
      );
      setSteps(editData.steps ? editData.steps.join(". ") : "");
      setImage(editData.image || "");
      setCategory(editData.category || "");
      localStorage.removeItem("editRecipe");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !category) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields and select a category!",
        confirmButtonColor: "#7a1f2a",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Recipe Saved!",
      text: `Your ${category} recipe "${title}" has been added successfully!`,
      confirmButtonColor: "#7a1f2a",
    });

    setTitle("");
    setDescription("");
    setIngredients("");
    setSteps("");
    setImage("");
    setCategory("");
  };

  // Dark mode colors for sections and inputs
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
            {title ? "Edit Your Recipe" : "Share Your Favorite Recipe"}
          </h1>
          <p className="text-lg">
            {title
              ? "Update your delicious creation for the Plateful community "
              : "Add your own recipe to inspire the Plateful community "}
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
            {title ? "Edit Recipe" : "Add Recipe"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
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

            <div>
              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
                Description
              </label>
              <textarea
                placeholder="Short description of your recipe"
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

            <div>
              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg px-4 py-2 focus:outline-none"
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

            <div>
              <label className="block font-semibold mb-2" style={{ color: sectionText }}>
                Image URL
              </label>
              <input
                type="text"
                placeholder="Paste an image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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
                {title ? "Update Recipe" : "Save Recipe"}
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
