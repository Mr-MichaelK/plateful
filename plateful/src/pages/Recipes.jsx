//Made by Adam Abdel Karim
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import Header from "../shared-components/Header";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const mockRecipes = [
  {
    title: "Berry Cobbler",
    description: "A sweet dessert with fresh berries.",
    image: "/recipes/berry-cobbler.jpg",
    category: "Dessert",
    whyLove:
      "Bursting with fresh berries and topped with a golden crisp — perfect for cozy evenings.",
    ingredients: ["Mixed berries", "Flour", "Sugar", "Butter"],
    steps: ["Mix berries with sugar.", "Make crumb topping.", "Bake until golden."],
    similar: [
      { title: "Blueberry Smoothie", image: "/recipes/blueberry-smoothie.jpg" },
      { title: "Apple Salad", image: "/recipes/apple-salad.jpg" }
    ],
    extraImages: [
      "/recipes/berry-extra1.jpg",
      "/recipes/berry-extra2.jpg"
    ]
  },

  {
    title: "Chickpea Veggie Patties",
    description: "Crispy and protein-packed patties.",
    image: "/recipes/chickpea-patties.jpg",
    category: "Lunch",
    whyLove:
      "Crunchy outside, soft inside, and full of flavor — a perfect healthy burger replacement.",
    ingredients: ["Chickpeas", "Onion", "Garlic", "Spices"],
    steps: ["Mash with veg.", "Form patties and fry.", "Serve with sauce."],
    similar: [
      { title: "Stew Beans", image: "/recipes/stew-beans.jpg" },
      { title: "Sweet Potato Hash", image: "/recipes/sweet-potato-hash.jpg" }
    ],
    extraImages: [
      "/recipes/chickpea-extra1.jpg",
      "/recipes/chickpea-extra2.jpg"
    ]
  },

  {
    title: "Sweet Potato Hash",
    description: "Perfect for a colorful breakfast.",
    image: "/recipes/sweet-potato-hash.jpg",
    category: "Breakfast",
    whyLove:
      "Vibrant, comforting, and nourishing — ideal for lazy mornings or brunch.",
    ingredients: ["Sweet potatoes", "Onion", "Peppers", "Eggs"],
    steps: ["Dice & sauté veg.", "Season.", "Top with eggs."],
    similar: [
      { title: "Berry Cobbler", image: "/recipes/berry-cobbler.jpg" },
      { title: "Chickpea Patties", image: "/recipes/chickpea-patties.jpg" }
    ],
    extraImages: [
      "/recipes/potato-extra1.jpg",
      "/recipes/potato-extra2.jpg"
    ]
  },

  {
    title: "Blueberry Smoothie",
    description: "Healthy and refreshing smoothie.",
    image: "/recipes/blueberry-smoothie.jpg",
    category: "Smoothies",
    whyLove:
      "A refreshing blend of sweet and tangy, giving you a burst of energy anytime.",
    ingredients: ["Blueberries", "Banana", "Yogurt", "Honey"],
    steps: ["Blend all.", "Adjust sweetness.", "Serve chilled."],
    similar: [
      { title: "Berry Cobbler", image: "/recipes/berry-cobbler.jpg" },
      { title: "Sweet Potato Hash", image: "/recipes/sweet-potato-hash.jpg" }
    ],
    extraImages: [
      "/recipes/blueberry-extra1.jpg",
      "/recipes/blueberry-extra2.jpg"
    ]
  },

  {
    title: "Spiced Apple Salad",
    description: "Crunchy and full of flavor.",
    image: "/recipes/apple-salad.jpg",
    category: "Lunch",
    whyLove:
      "A refreshing fall-inspired salad packed with apple crunch and warm spices.",
    ingredients: ["Apples", "Walnuts", "Spinach", "Cinnamon Dressing"],
    steps: ["Chop apples.", "Toss with dressing.", "Serve fresh."],
    similar: [
      { title: "Berry Cobbler", image: "/recipes/berry-cobbler.jpg" },
      { title: "Blueberry Smoothie", image: "/recipes/blueberry-smoothie.jpg" }
    ],
    extraImages: [
      "/recipes/apple-extra1.jpg",
      "/recipes/apple-extra2.jpg"
    ]
  },

  {
    title: "Brown Stew Beans",
    description: "Hearty and rich in taste.",
    image: "/recipes/stew-beans.jpg",
    category: "Dinner",
    whyLove:
      "A Caribbean-inspired dish that’s hearty, flavorful, and full of protein.",
    ingredients: ["Kidney beans", "Garlic", "Thyme", "Coconut milk"],
    steps: ["Soak beans.", "Simmer with spices.", "Serve warm."],
    similar: [
      { title: "Chickpea Veggie Patties", image: "/recipes/chickpea-patties.jpg" },
      { title: "Sweet Potato Hash", image: "/recipes/sweet-potato-hash.jpg" }
    ],
    extraImages: [
      "/recipes/beans-extra1.jpg",
      "/recipes/beans-extra2.jpg"
    ]
  }
];

// ---- REST OF YOUR FILE REMAINS EXACTLY THE SAME ----

const Recipes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (categoryFromURL) setSelectedCategory(categoryFromURL);
    else setSelectedCategory("All");
  }, [categoryFromURL]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") navigate("/recipes");
    else navigate(`/recipes?category=${cat}`);
  };

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const suggestions = mockRecipes
    .filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        searchTerm.length > 0;
      const matchesCategory =
        selectedCategory === "All" || r.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .slice(0, 5);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <>
      <Header />
      <section className="px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-[#7a1f2a] mb-10">All Recipes</h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-6" ref={searchRef}>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-full border-[#7a1f2a] focus:outline-none focus:ring-2 focus:ring-[#7a1f2a]"
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSuggestionClick(s.title)}
                    className="px-4 py-2 text-left text-gray-700 hover:bg-[#f6e9da] cursor-pointer"
                  >
                    {s.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Smoothies"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
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

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.title} recipe={recipe} id={encodeURIComponent(recipe.title)} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg mt-8">No recipes found matching your search.</p>
        )}
      </section>
      <Footer />
    </>
  );
};

export { mockRecipes };
export default Recipes;
