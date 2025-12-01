// Made by Michael Kolanjian
import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Image as ImageIcon } from "lucide-react";
import { API_BASE_URL } from "../../apiConfig";

function getServerRoot(baseUrl) {
  return baseUrl.replace(/\/api$/, "");
}

export default function RecipeSelectorModal({
  isOpen,
  onClose,
  onSelectRecipe,
  day,
  meal,
}) {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const SERVER_ROOT = getServerRoot(API_BASE_URL);

  useEffect(() => {
    if (recipes.length === 0 && isOpen) {
      setIsLoading(true);
      const fetchRecipes = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/recipes`, {
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();

          const simplifiedRecipes = data.map((r) => ({
            id: r._id,
            name: r.title,
            imageUrl: r.image ? `${SERVER_ROOT}${r.image}` : null,
          }));

          setRecipes(simplifiedRecipes);
        } catch (error) {
          console.error("Failed to fetch recipes for modal:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecipes();
    }
  }, [isOpen, recipes.length, SERVER_ROOT]);

  if (!isOpen) return null;

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const modalBg = theme === "dark" ? "#1a1a1a" : "#fff";
  const headingColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const textColor = theme === "dark" ? "#e0dcd5" : "#555";
  const inputBg = theme === "dark" ? "#2a2a2a" : "#fff";
  const inputBorder = theme === "dark" ? "#555" : "#ccc";
  const listHoverBg = theme === "dark" ? "#343434" : "#fff0e5";

  const itemTextColor = theme === "dark" ? "#f2d8d8" : "#7a1f2a";

  const cancelBg = theme === "dark" ? "#5a191f" : "#7a1f2a";
  const cancelHover = theme === "dark" ? "#7a1f2a" : "#a02a3d";
  // ---------------------------------

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      {/* Modal */}
      <div
        className="rounded-xl shadow-lg p-6 w-11/12 max-w-md relative z-50 transition-colors duration-300"
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

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-md"
          style={{
            backgroundColor: inputBg,
            border: `1px solid ${inputBorder}`,
            color: textColor,
          }}
        />

        {/* Recipes List */}
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {isLoading ? (
            <li className="px-4 py-2 text-center" style={{ color: textColor }}>
              <div
                className="animate-spin inline-block w-5 h-5 border-2 rounded-full border-t-transparent mr-2"
                style={{
                  borderColor: headingColor,
                  borderTopColor: "transparent",
                }}
              ></div>
              Loading recipes...
            </li>
          ) : filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <li
                key={recipe.id || recipe.name} // Use id for better key uniqueness
                onClick={() => onSelectRecipe(recipe)}
                className="cursor-pointer px-4 py-2 rounded-md transition flex items-center space-x-3"
                style={{
                  color: itemTextColor,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = listHoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {recipe.imageUrl ? (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="w-6 h-6 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <ImageIcon
                    size={18}
                    className="text-gray-500"
                    style={{ color: textColor }}
                  />
                )}

                <span>{recipe.name}</span>
              </li>
            ))
          ) : (
            <li
              className="px-4 py-2"
              style={{ color: theme === "dark" ? "#777" : "#999" }}
            >
              No recipes found
            </li>
          )}
        </ul>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-md transition"
          style={{
            backgroundColor: cancelBg,
            color: "#fff",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = cancelHover)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = cancelBg)
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
