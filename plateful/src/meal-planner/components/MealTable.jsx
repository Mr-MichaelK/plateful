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
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ day: null, meal: null });

  const [mealData, setMealData] = useState(
    Array(meals.length)
      .fill(0)
      .map(() => Array(7).fill("-"))
  );

  useEffect(() => {
    const key = getWeekKey(currentDate);
    const saved = localStorage.getItem(key);
    if (saved) {
      setMealData(JSON.parse(saved));
    } else {
      setMealData(
        Array(meals.length)
          .fill(0)
          .map(() => Array(7).fill("-"))
      );
    }
  }, [currentDate]);

  const saveMealData = (newData) => {
    setMealData(newData);
    const key = getWeekKey(currentDate);
    localStorage.setItem(key, JSON.stringify(newData));
  };

  const handleCellClick = (dayIdx, mealIdx) => {
    if (mealData[mealIdx][dayIdx] === "-") {
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
              {days.map((_, dayIdx) => (
                <td
                  key={dayIdx}
                  className="p-3 text-center text-gray-500 cursor-pointer relative hover:bg-[#fff8f0] transition group"
                  onClick={() => handleCellClick(dayIdx, mealIdx)}
                >
                  {mealData[mealIdx][dayIdx] !== "-" && (
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
                  {mealData[mealIdx][dayIdx]}
                </td>
              ))}
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
