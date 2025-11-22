// Made by Michael Kolanjian
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function RecipeSelectorModal({
  isOpen,
  onClose,
  onSelectRecipe,
  day,
  meal,
}) {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const recipes = [
    "Spaghetti Bolognese",
    "Chicken Salad",
    "Pancakes",
    "Grilled Salmon",
    "Veggie Stir Fry",
  ];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Section-specific colors
  const modalBg = theme === "dark" ? "#1a1a1a" : "#fff";
  const headingColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e0dcd5" : "#555";
  const inputBg = theme === "dark" ? "#2a2a2a" : "#fff";
  const inputBorder = theme === "dark" ? "#555" : "#ccc";
  const listHoverBg = theme === "dark" ? "#343434" : "#fff0e5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="rounded-xl shadow-lg p-6 w-11/12 max-w-md transition-colors duration-300"
        style={{ backgroundColor: modalBg }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-semibold transition-colors duration-300"
            style={{ color: headingColor }}
          >
            Select Recipe for {meal} ({day})
          </h2>
          <button
            onClick={onClose}
            className="font-bold text-xl transition-colors duration-300"
            style={{ color: textColor }}
          >
            &times;
          </button>
        </div>

        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-md focus:outline-none transition-colors duration-300"
          style={{
            backgroundColor: inputBg,
            borderColor: inputBorder,
            color: textColor,
          }}
        />

        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <li
                key={recipe}
                onClick={() => onSelectRecipe(recipe)}
                className="cursor-pointer px-4 py-2 rounded-md transition-colors duration-300"
                style={{ color: headingColor }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = listHoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {recipe}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400">No recipes found</li>
          )}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-md transition-colors duration-300"
          style={{
            backgroundColor: theme === "dark" ? "#7a1f2a" : "#7a1f2a",
            color: theme === "dark" ? "#fff" : "#fff",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              theme === "dark" ? "#a02a3d" : "#a02a3d")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              theme === "dark" ? "#7a1f2a" : "#7a1f2a")
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
