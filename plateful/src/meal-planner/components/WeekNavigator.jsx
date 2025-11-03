import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WeekNavigator({ currentDate, onPrevWeek, onNextWeek }) {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div className="flex justify-center items-center gap-6 mb-6">
      <button
        onClick={onPrevWeek}
        className="p-2 rounded-full hover:bg-[#fff0e5] transition"
      >
        <ChevronLeft className="text-[#7a1f2a]" size={24} />
      </button>
      <h2 className="text-lg font-semibold">
        {formatDate(startOfWeek)} → {formatDate(endOfWeek)}
      </h2>
      <button
        onClick={onNextWeek}
        className="p-2 rounded-full hover:bg-[#fff0e5] transition"
      >
        <ChevronRight className="text-[#7a1f2a]" size={24} />
      </button>
    </div>
  );
}
