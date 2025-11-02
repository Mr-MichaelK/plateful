import React from "react";
import { useNavigate } from "react-router-dom"; // added

const categories = [
  { name: "Breakfast", image: "/categories/breakfast.jpg" },
  { name: "Lunch", image: "/categories/lunch.jpg" },
  { name: "Dinner", image: "/categories/dinner.jpg" },
  { name: "Dessert", image: "/categories/dessert.jpg" },
  { name: "Smoothies", image: "/categories/smoothie.jpg" },
];

const CategoriesSection = () => {
  const navigate = useNavigate(); // added

  // added - handle category click
  const handleCategoryClick = (category) => {
    navigate(`/recipes?category=${category}`);
  };

  return (
    <section className="py-14 px-6 bg-[#faf8f6] text-center">
      <h2 className="text-2xl font-bold text-[#7a1f2a] mb-8">Explore by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleCategoryClick(cat.name)} // added click handler
            className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-28 object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold text-sm">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
