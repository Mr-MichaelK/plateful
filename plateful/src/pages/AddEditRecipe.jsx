// made by Noura Hajj Chehade

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../shared-components/Header";
import Swal from "sweetalert2";

const AddEditRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields!",
        confirmButtonColor: "#7a1f2a",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Recipe Saved!",
      text: "Your recipe has been added successfully!",
      confirmButtonColor: "#7a1f2a",
    });

    setTitle("");
    setDescription("");
    setIngredients("");
    setSteps("");
    setImage("");
  };

  return (
    <>
      <Header />

      <section className="relative bg-[#fff8f0] py-16 px-6 text-center overflow-hidden">
        <img
          src="/recipes/top-image.jpg"
          alt="Add Recipe Background"
          className="absolute inset-0 w-full h-full object-cover opacity-35" 
        />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#7a1f2a] mb-3 drop-shadow-md">
            Share Your Favorite Recipe
          </h1>
          <p className="text-gray-700 text-lg">
            Add your own recipe to inspire the Plateful community 
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#fffaf6]">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#7a1f2a] mb-8 text-center">
            Add / Edit Recipe
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label className="block font-semibold text-[#7a1f2a] mb-2">
                Recipe Title
              </label>
              <input
                type="text"
                placeholder="Enter recipe title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a1f2a]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#7a1f2a] mb-2">
                Description
              </label>
              <textarea
                placeholder="Short description of your recipe"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#7a1f2a]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#7a1f2a] mb-2">
                Ingredients
              </label>
              <textarea
                placeholder="List ingredients (comma-separated)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#7a1f2a]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#7a1f2a] mb-2">
                Steps
              </label>
              <textarea
                placeholder="Write preparation steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#7a1f2a]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#7a1f2a] mb-2">
                Image URL
              </label>
              <input
                type="text"
                placeholder="Paste an image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a1f2a]"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#7a1f2a] text-white px-8 py-3 rounded-lg hover:bg-[#a02a3d] transition font-medium"
              >
                Save Recipe
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
