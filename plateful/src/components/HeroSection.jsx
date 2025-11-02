import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleBrowse = () => {
    navigate("/recipes");
  };

  return (
    <section className="text-center py-16 bg-[#f6e9da] px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-[#7a1f2a] mb-4">
        Discover Delicious Recipes & Plan Meals Like a Pro
      </h2>
      <p className="max-w-xl mx-auto text-gray-700">
        Explore our collection of easy, healthy, and tasty recipes made for every occasion.
      </p>
      <button
        onClick={handleBrowse}
        className="mt-6 bg-[#7a1f2a] text-white px-6 py-3 rounded-full hover:bg-[#a02a3d] transition"
      >
        Browse Recipes
      </button>
    </section>
  );
};

export default HeroSection;
