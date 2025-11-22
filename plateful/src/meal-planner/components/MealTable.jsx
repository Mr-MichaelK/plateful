// Made by Michael Kolanjian
import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import RecipeSelectorModal from "./RecipeSelectorModal";

const meals = ["Breakfast", "Lunch", "Dinner"];

const getWeekKey = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday as start
  return `meals-${startOfWeek.toISOString().split("T")[0]}`;
};

export default function MealTable({ currentDate }) {
  // Defensive check for currentDate
  if (!currentDate || !(currentDate instanceof Date)) {
    return (
      <div className="p-4 text-center text-red-500">
        Error: Please provide a valid date object to the table.
      </div>
    );
  }

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ day: null, meal: null });

  // Initialize with placeholders
  const initialMealData = Array(meals.length)
    .fill(0)
    .map(() => Array(7).fill("-"));

  // mealData now stores the recipe object OR the string "-"
  const [mealData, setMealData] = useState(initialMealData);

  useEffect(() => {
    const key = getWeekKey(currentDate);
    const saved = localStorage.getItem(key);
    if (saved) {
      setMealData(JSON.parse(saved));
    } else {
      setMealData(initialMealData);
    }
  }, [currentDate]);

  const saveMealData = (newData) => {
    setMealData(newData);
    const key = getWeekKey(currentDate);
    localStorage.setItem(key, JSON.stringify(newData));
  };

  // Helper to check if the cell is empty (either "-" or null/undefined)
  const isCellEmpty = (data) =>
    data === "-" || data === null || data === undefined;

  const handleCellClick = (dayIdx, mealIdx) => {
    // Check if the cell is currently empty
    if (isCellEmpty(mealData[mealIdx][dayIdx])) {
      setSelectedSlot({ day: dayIdx, meal: mealIdx });
      setModalOpen(true);
    }
  };

  const handleSelectRecipe = (recipe) => {
    // Save the entire recipe object so we can access the image URL
    const newMealData = [...mealData];
    newMealData[selectedSlot.meal][selectedSlot.day] = recipe;
    saveMealData(newMealData);
    setModalOpen(false);
  };

  const handleDelete = (dayIdx, mealIdx) => {
    const newMealData = [...mealData];
    newMealData[mealIdx][dayIdx] = "-"; // Reset to placeholder
    saveMealData(newMealData);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-xl bg-white shadow-sm">
        <thead>
          <tr className="bg-[#fff0e5] text-[#7a1f2a]">
            <th className="p-3 text-left">Meal</th>
            {days.map((day, idx) => (
              <th key={idx} className="p-3 text-center font-semibold">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {meals.map((meal, mealIdx) => (
            <tr key={meal} className="border-t border-gray-200">
              <td className="p-3 font-medium">{meal}</td>
              {days.map((_, dayIdx) => {
                const cellData = mealData[mealIdx][dayIdx];
                // Determine if the cell contains a saved recipe object
                const isRecipe =
                  !isCellEmpty(cellData) &&
                  typeof cellData === "object" &&
                  cellData.name;

                // Get display name and image URL
                const recipeName = isRecipe ? cellData.name : cellData;
                const recipeImageUrl = isRecipe ? cellData.imageUrl : null;

                // 💡 NEW LOGIC: Determine classes based on content
                let cellColorClass = "text-gray-400"; // Default for empty cell

                if (isRecipe) {
                  // Change text to black for filled cells
                  cellColorClass = "text-black";

                  // Assign a background color based on the meal type (mealIdx 0, 1, or 2)
                  switch (mealIdx) {
                    case 0: // Breakfast
                      cellColorClass += " bg-amber-50"; // Light Yellow/Orange
                      break;
                    case 1: // Lunch
                      cellColorClass += " bg-green-50"; // Light Green
                      break;
                    case 2: // Dinner
                      cellColorClass += " bg-blue-50"; // Light Blue
                      break;
                    default:
                      cellColorClass += " bg-gray-50";
                  }
                }

                return (
                  <td
                    key={dayIdx}
                    // 💡 UPDATED CLASS: Combine static and dynamic classes
                    className={`p-3 text-center cursor-pointer relative transition group
                                hover:bg-[#fff8f0] ${cellColorClass}`}
                    onClick={() => handleCellClick(dayIdx, mealIdx)}
                  >
                    {/* Delete button */}
                    {isRecipe && (
                      <button
                        className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(dayIdx, mealIdx);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}

                    {/* Image and Text Display */}
                    <div className="flex items-center justify-center space-x-2">
                      {isRecipe && recipeImageUrl && (
                        <img
                          src={recipeImageUrl}
                          alt={recipeName}
                          className="w-6 h-6 object-cover rounded-md" // Small square image
                        />
                      )}
                      <span>{recipeName}</span>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <RecipeSelectorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectRecipe={handleSelectRecipe}
        day={
          selectedSlot.day !== null
            ? days[selectedSlot.day].toLocaleDateString("en-US", {
                weekday: "short",
              })
            : ""
        }
        meal={selectedSlot.meal !== null ? meals[selectedSlot.meal] : ""}
      />
    </div>
  );
}
