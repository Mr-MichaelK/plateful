//Made by Michael Kolanjian
import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

const IMAGE_URL = "/recipes/dish1.jpg";

export default function RecipeSelectorModal({
  isOpen,
  onClose,
  onSelectRecipe,
  day,
  meal,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const mockRecipes = [
    { name: "Spaghetti Bolognese", imageUrl: IMAGE_URL },
    { name: "Chicken Salad", imageUrl: IMAGE_URL },
    { name: "Pancakes", imageUrl: IMAGE_URL },
    { name: "Grilled Salmon", imageUrl: IMAGE_URL },
    { name: "Veggie Stir Fry", imageUrl: IMAGE_URL },
    { name: "Beef Shawarma", imageUrl: IMAGE_URL },
    { name: "Chicken Shawarma", imageUrl: IMAGE_URL },
  ];

  const filteredRecipes = mockRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Blurred + slightly darkened background
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/20 backdrop-blur-sm"
    >
      {/* Modal */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative z-50">
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
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#7a1f2a]"
        />

        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <li
                key={recipe.name}
                onClick={() => onSelectRecipe(recipe)}
                className="cursor-pointer px-4 py-2 rounded-md hover:bg-[#fff0e5] 
                           text-[#7a1f2a] transition flex items-center space-x-3"
              >
                {recipe.imageUrl ? (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="w-6 h-6 object-cover rounded-md"
                  />
                ) : (
                  <ImageIcon size={18} className="text-gray-500" />
                )}

                <span>{recipe.name}</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400">No recipes found</li>
          )}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#7a1f2a] text-white py-2 rounded-md 
                     hover:bg-[#a02a3d] transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
