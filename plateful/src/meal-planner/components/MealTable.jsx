// Made by Michael Kolanjian
import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import RecipeSelectorModal from "./RecipeSelectorModal";
import { useTheme } from "../../context/ThemeContext";

const meals = ["Breakfast", "Lunch", "Dinner"];

const getWeekKey = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay() + 1);
  return `meals-${startOfWeek.toISOString().split("T")[0]}`;
};

export default function MealTable({ currentDate }) {
  const { theme } = useTheme();

  // Defensive check
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

  const initialMealData = Array(meals.length)
    .fill(0)
    .map(() => Array(7).fill("-"));

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

  const isCellEmpty = (data) =>
    data === "-" || data === null || data === undefined;

  const handleCellClick = (dayIdx, mealIdx) => {
    if (isCellEmpty(mealData[mealIdx][dayIdx])) {
      setSelectedSlot({ day: dayIdx, meal: mealIdx });
      setModalOpen(true);
    }
  };

  const handleSelectRecipe = (recipe) => {
    const newMealData = [...mealData];
    newMealData[selectedSlot.meal][selectedSlot.day] = recipe;
    saveMealData(newMealData);
    setModalOpen(false);
  };

  const handleDelete = (dayIdx, mealIdx) => {
    const newMealData = [...mealData];
    newMealData[mealIdx][dayIdx] = "-";
    saveMealData(newMealData);
  };

  // 🌙 THEME COLORS
  const tableBg = theme === "dark" ? "#1a1a1a" : "#ffffff";
  const headerBg = theme === "dark" ? "#2a2a2a" : "#fff0e5";
  const headerText = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const borderColor = theme === "dark" ? "#444" : "#ccc";

  // text colors
  const emptyText = theme === "dark" ? "#777" : "#999";
  const filledText = theme === "dark" ? "#f9f9f9" : "#000";

  // hover bg
  const hoverBg = theme === "dark" ? "#2d2d2d" : "#fff8f0";

  // meal backgrounds
  const mealBg = [
    theme === "dark" ? "#4a3b1f" : "#fff5d6", // breakfast
    theme === "dark" ? "#1f3d2e" : "#e8ffe8", // lunch
    theme === "dark" ? "#1f2f4a" : "#e8f0ff", // dinner
  ];

  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full rounded-xl shadow-sm"
        style={{
          backgroundColor: tableBg,
          borderColor: borderColor,
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: headerBg, color: headerText }}>
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
            <tr key={meal} className="border-t" style={{ borderColor }}>
              <td className="p-3 font-medium" style={{ color: headerText }}>
                {meal}
              </td>

              {days.map((_, dayIdx) => {
                const cellData = mealData[mealIdx][dayIdx];
                const isRecipe =
                  !isCellEmpty(cellData) &&
                  typeof cellData === "object" &&
                  cellData.name;

                const recipeName = isRecipe ? cellData.name : cellData;
                const recipeImageUrl = isRecipe ? cellData.imageUrl : null;

                return (
                  <td
                    key={dayIdx}
                    className="p-3 text-center cursor-pointer relative transition group"
                    onClick={() => handleCellClick(dayIdx, mealIdx)}
                    style={{
                      backgroundColor: isRecipe
                        ? mealBg[mealIdx]
                        : "transparent",
                      color: isRecipe ? filledText : emptyText,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = isRecipe
                        ? mealBg[mealIdx]
                        : hoverBg)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = isRecipe
                        ? mealBg[mealIdx]
                        : "transparent")
                    }
                  >
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

                    <div className="flex items-center justify-center space-x-2">
                      {isRecipe && recipeImageUrl && (
                        <img
                          src={recipeImageUrl}
                          alt={recipeName}
                          className="w-6 h-6 object-cover rounded-md"
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
