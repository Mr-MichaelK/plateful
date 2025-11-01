import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";

const mockRecipes = [
  { title: "Berry Cobbler", description: "A sweet dessert with fresh berries.", image: "/recipes/berry-cobbler.jpg" },
  { title: "Chickpea Veggie Patties", description: "Crispy and protein-packed patties.", image: "/recipes/chickpea-patties.jpg" },
  { title: "Sweet Potato Hash", description: "Perfect for a colorful breakfast.", image: "/recipes/sweet-potato-hash.jpg" },
  { title: "Blueberry Smoothie", description: "Healthy and refreshing smoothie.", image: "/recipes/blueberry-smoothie.jpg" },
  { title: "Spiced Apple Salad", description: "Crunchy and full of flavor.", image: "/recipes/apple-salad.jpg" },
  { title: "Brown Stew Beans", description: "Hearty and rich in taste.", image: "/recipes/stew-beans.jpg" },
];

const Recipes = () => (
  <>
    <Navbar />
    <section className="px-6 py-12 text-center">
      <h2 className="text-3xl font-bold text-[#7a1f2a] mb-10">All Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockRecipes.map((recipe, i) => (
          <RecipeCard key={i} recipe={recipe} />
        ))}
      </div>
    </section>
    <Footer />
  </>
);

export default Recipes;
