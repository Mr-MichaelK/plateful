import React, { useState } from "react";

export default function RecipeSelectorModal({
  isOpen,
  onClose,
  onSelectRecipe,
  day,
  meal,
}) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#7a1f2a]">
            Select Recipe for {meal} ({day})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl"
          >
            &times;
          </button>
        </div>

        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1f2a]"
        />

        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <li
                key={recipe}
                onClick={() => onSelectRecipe(recipe)}
                className="cursor-pointer px-4 py-2 rounded-md hover:bg-[#fff0e5] text-[#7a1f2a] transition"
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
          className="mt-4 w-full bg-[#7a1f2a] text-white py-2 rounded-md hover:bg-[#a02a3d] transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
