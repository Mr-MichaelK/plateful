//Made by Michael Kolanjian
import React, { useState } from "react";
import WeekNavigator from "./components/WeekNavigator";
import MealTable from "./components/MealTable";
import QuoteSection from "./components/QuoteSection";

export default function MealPlannerPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <section className="p-6 md:p-10 bg-[#fff8f0] min-h-screen text-[#7a1f2a]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
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
