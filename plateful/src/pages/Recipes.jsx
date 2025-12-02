// Made by Adam Abdel Karim
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import Header from "../shared-components/Header";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Recipes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Theme context
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");

  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Fetch recipes from backend
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("https://plateful-backend-dn0i.onrender.com/api/recipes"); // replace with your backend URL
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
        setRecipes([]); // fallback empty
      }
    }
    fetchRecipes();
  }, []);

  // Handle category from URL
  useEffect(() => {
    if (categoryFromURL) setSelectedCategory(categoryFromURL);
    else setSelectedCategory("All");
  }, [categoryFromURL]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Category selection
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") navigate("/recipes");
    else navigate(`/recipes?category=${cat}`);
  };

  // Filter recipes by search + category
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Suggestions
  const suggestions = recipes
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

  // Theme-based colors
  const pageBg = theme === "dark" ? "#1a1a1a" : "#fffaf6";
  const titleColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e5e5e5" : "#444";
  const inputBg = theme === "dark" ? "#2a2a2a" : "#fff";
  const inputBorder = theme === "dark" ? "#444" : "#7a1f2a";
  const suggestionHover = theme === "dark" ? "#333" : "#f6e9da";

  return (
    <div style={{ backgroundColor: pageBg, color: textColor, minHeight: "100vh" }}>
      <Header />
      <section className="px-6 py-12 text-center">
        <h2 className="text-3xl font-bold mb-10" style={{ color: titleColor }}>
          All Recipes
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-6" ref={searchRef}>
          <div className="relative w-full max-w-sm">
            <Search
              className={`absolute left-3 top-2.5 w-5 h-5 ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2"
              style={{
                backgroundColor: inputBg,
                borderColor: inputBorder,
                borderStyle: "solid",
                color: textColor,
              }}
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="absolute left-0 right-0 mt-1 rounded-lg shadow-md z-10"
                style={{ backgroundColor: inputBg, borderColor: inputBorder, borderStyle: "solid" }}
              >
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSuggestionClick(s.title)}
                    className="px-4 py-2 text-left cursor-pointer hover:opacity-80"
                    style={{ color: textColor, backgroundColor: "transparent" }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = suggestionHover)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
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
              className="
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
                border
                cursor-pointer
                transform
                transition-all
                duration-200
                hover:scale-105
              "
              style={{
                backgroundColor:
                  selectedCategory === cat
                    ? theme === "dark"
                      ? "#f9c8c8"
                      : "#7a1f2a"
                    : "transparent",
                color:
                  selectedCategory === cat
                    ? theme === "dark"
                      ? "#1a1a1a"
                      : "#fff"
                    : textColor,
                borderColor: inputBorder,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.title}
                recipe={recipe}
                id={encodeURIComponent(recipe.title)}
                theme={theme} 
              />
            ))}
          </div>
        ) : (
          <p className="text-lg mt-8" style={{ color: textColor }}>
            No recipes found matching your search.
          </p>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Recipes;
