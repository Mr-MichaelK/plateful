import React from "react";
import RecipeCard from "./RecipeCard";

const mockRecipes = [
  { title: "Berry Cobbler", description: "A sweet dessert with fresh berries.", image: "/recipes/berry-cobbler.jpg" },
  { title: "Chickpea Veggie Patties", description: "Crispy and protein-packed patties.", image: "/recipes/chickpea-patties.jpg" },
  { title: "Sweet Potato Hash", description: "Perfect for a colorful breakfast.", image: "/recipes/sweet-potato-hash.jpg" },
  { title: "Blueberry Smoothie", description: "Healthy and refreshing smoothie.", image: "/recipes/blueberry-smoothie.jpg" },
];

const FeaturedRecipes = () => (
  <section className="py-14 px-6 bg-[#fff] text-center">
    <h2 className="text-2xl font-bold text-[#7a1f2a] mb-8">Featured Recipes</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {mockRecipes.map((recipe, i) => (
        <RecipeCard key={i} recipe={recipe} />
      ))}
    </div>
  </section>
);

export default FeaturedRecipes;
