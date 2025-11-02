// This file is initially done by Adam (Noura edited and copy-paste it)
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import Header from "../shared-components/Header";
import React, { useState, useEffect } from "react"; // added useEffect
import { useLocation, useNavigate } from "react-router-dom"; // added

const mockRecipes = [
  {
    title: "Berry Cobbler",
    description: "A sweet dessert with fresh berries.",
    image: "/recipes/berry-cobbler.jpg",
    category: "Dessert", // added category
    // edited by Noura (added full details for RecipeDetails)
    whyLove:
      "Bursting with fresh berries and topped with a golden crisp — perfect for cozy evenings.",
    ingredients: ["Mixed berries", "Flour", "Sugar", "Butter"],
    steps: ["Mix berries with sugar.", "Make crumb topping.", "Bake until golden."],
    similar: [
      { title: "Blueberry Smoothie", image: "/recipes/blueberry-smoothie.jpg" },
      { title: "Apple Salad", image: "/recipes/apple-salad.jpg" },
    ],
  },
  {
    title: "Chickpea Veggie Patties",
    description: "Crispy and protein-packed patties.",
    image: "/recipes/chickpea-patties.jpg",
    category: "Lunch", // added category
    // edited by Noura
    whyLove:
      "Crunchy outside, soft inside, and full of flavor — a perfect healthy burger replacement.",
    ingredients: ["Chickpeas", "Onion", "Garlic", "Spices"],
    steps: ["Mash with veg.", "Form patties and fry.", "Serve with sauce."],
    similar: [
      { title: "Stew Beans", image: "/recipes/stew-beans.jpg" },
      { title: "Sweet Potato Hash", image: "/recipes/sweet-potato-hash.jpg" },
    ],
  },
  {
    title: "Sweet Potato Hash",
    description: "Perfect for a colorful breakfast.",
    image: "/recipes/sweet-potato-hash.jpg",
    category: "Breakfast", // added category
    // edited by Noura
    whyLove:
      "Vibrant, comforting, and nourishing — ideal for lazy mornings or brunch.",
    ingredients: ["Sweet potatoes", "Onion", "Peppers", "Eggs"],
    steps: ["Dice & sauté veg.", "Season.", "Top with eggs."],
    similar: [
      { title: "Berry Cobbler", image: "/recipes/berry-cobbler.jpg" },
      { title: "Chickpea Patties", image: "/recipes/chickpea-patties.jpg" },
    ],
  },
  {
    title: "Blueberry Smoothie",
    description: "Healthy and refreshing smoothie.",
    image: "/recipes/blueberry-smoothie.jpg",
    category: "Smoothies", // added category
    // edited by Noura
    whyLove:
      "A refreshing blend of sweet and tangy, giving you a burst of energy anytime.",
    ingredients: ["Blueberries", "Banana", "Yogurt", "Honey"],
    steps: ["Blend all.", "Adjust sweetness.", "Serve chilled."],
    similar: [
      { title: "Berry Cobbler", image: "/recipes/berry-cobbler.jpg" },
      { title: "Sweet Potato Hash", image: "/recipes/sweet-potato-hash.jpg" },
    ],
  },
  {
    title: "Spiced Apple Salad",
    description: "Crunchy and full of flavor.",
    image: "/recipes/apple-salad.jpg",
    category: "Lunch", // added category
    // edited by Noura
    whyLove:
      "A refreshing fall-inspired salad packed with apple crunch and warm spices.",
    ingredients: ["Apples", "Walnuts", "Spinach", "Cinnamon Dressing"],
    steps: ["Chop apples.", "Toss with dressing.", "Serve fresh."],
    similar: [
      { title: "Berry Cobbler", image: "/recipes/berry-cobbler.jpg" },
      { title: "Blueberry Smoothie", image: "/recipes/blueberry-smoothie.jpg" },
    ],
  },
  {
    title: "Brown Stew Beans",
    description: "Hearty and rich in taste.",
    image: "/recipes/stew-beans.jpg",
    category: "Dinner", // added category
    // edited by Noura
    whyLove:
      "A Caribbean-inspired dish that’s hearty, flavorful, and full of protein.",
    ingredients: ["Kidney beans", "Garlic", "Thyme", "Coconut milk"],
    steps: ["Soak beans.", "Simmer with spices.", "Serve warm."],
    similar: [
      { title: "Chickpea Veggie Patties", image: "/recipes/chickpea-patties.jpg" },
      { title: "Sweet Potato Hash", image: "/recipes/sweet-potato-hash.jpg" },
    ],
  },
];

const Recipes = () => {
  const location = useLocation(); // added
  const navigate = useNavigate(); // added
  const queryParams = new URLSearchParams(location.search); // added
  const categoryFromURL = queryParams.get("category"); // added

  const [selectedCategory, setSelectedCategory] = useState("All"); // added filter state

  // added: update selected category when navigating from CategoriesSection
  useEffect(() => {
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryFromURL]);

  // added: update URL when user clicks a filter button
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      navigate("/recipes");
    } else {
      navigate(`/recipes?category=${cat}`);
    }
  };

  // Adam Abdel Karim: Filter recipes based on category 
  const filteredRecipes =
    selectedCategory === "All"
      ? mockRecipes
      : mockRecipes.filter((r) => r.category === selectedCategory);

  return (
    <>
      <Header />
      <section className="px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-[#7a1f2a] mb-10">All Recipes</h2>

        {/* Adam: Abdel Karim: added category filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Smoothies"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)} // updated to handleCategorySelect
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                selectedCategory === cat
                  ? "bg-[#7a1f2a] text-white border-[#7a1f2a]"
                  : "text-[#7a1f2a] border-[#7a1f2a] hover:bg-[#7a1f2a]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* edited by Noura (pass recipe id for clickable cards) */}
          {filteredRecipes.map((recipe, i) => (
            <RecipeCard key={i} recipe={recipe} id={i} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export { mockRecipes }; // edited by Noura (makes recipes data shareable)
export default Recipes;
