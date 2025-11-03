import React from "react";
import { useNavigate } from "react-router-dom";
import cookingVideo from "../assets/cooking1.mp4"; // ✅ correct relative path

const HeroSection = () => {
  const navigate = useNavigate();

  const handleBrowse = () => {
    navigate("/recipes");
  };

  return (
    <section className="relative text-center py-20 px-6 overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={cookingVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay to slightly darken the video */}
      <div className="absolute inset-0 bg-[#f6e9da]/40 backdrop-blur-[2px]"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Semi-transparent card */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-[#7a1f2a] mb-4 drop-shadow-md">
            Discover Delicious Recipes & Plan Meals Like a Pro
          </h2>
          <p className="text-gray-800 mb-6 drop-shadow-sm">
            Explore our collection of easy, healthy, and tasty recipes made for every occasion.
          </p>
          <button
            onClick={handleBrowse}
            className="bg-[#7a1f2a] text-white px-6 py-3 rounded-full hover:bg-[#a02a3d] transition"
          >
            Browse Recipes
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
