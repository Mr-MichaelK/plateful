// Made by Michael Kolanjian
import React, { useState } from "react";
import WeekNavigator from "./components/WeekNavigator";
import MealTable from "./components/MealTable";
import QuoteSection from "./components/QuoteSection";
import { useTheme } from "../context/ThemeContext";

export default function MealPlannerPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { theme } = useTheme();

  const goToPreviousWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  // Section-specific colors
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fff8f0"; // dark gray vs light cream
  const sectionText = theme === "dark" ? "#f9c8c8" : "#7a1f2a"; // light pink vs brown

  return (
    <section
      className="p-6 md:p-10 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: sectionBg, color: sectionText }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center transition-colors duration-300">
          Weekly Meal Planner
        </h1>

        <WeekNavigator
          currentDate={currentDate}
          onPrevWeek={goToPreviousWeek}
          onNextWeek={goToNextWeek}
        />

        <MealTable currentDate={currentDate} />

        <QuoteSection />
      </div>
    </section>
  );
}
