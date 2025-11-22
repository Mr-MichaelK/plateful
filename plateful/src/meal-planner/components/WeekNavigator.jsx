// Made by Michael Kolanjian
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function WeekNavigator({ currentDate, onPrevWeek, onNextWeek }) {
  const { theme } = useTheme();

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  // Section-specific colors
  const textColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const hoverBg = theme === "dark" ? "#343434" : "#fff0e5";
  const bg = theme === "dark" ? "#1a1a1a" : "transparent";

  return (
    <div
      className="flex justify-center items-center gap-6 mb-6 rounded transition-colors duration-300"
      style={{ backgroundColor: bg }}
    >
      <button
        onClick={onPrevWeek}
        className="p-2 rounded-full transition-colors duration-300"
        style={{ backgroundColor: bg }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bg)}
      >
        <ChevronLeft className="transition-colors duration-300" style={{ color: textColor }} size={24} />
      </button>

      <h2 className="text-lg font-semibold transition-colors duration-300" style={{ color: textColor }}>
        {formatDate(startOfWeek)} → {formatDate(endOfWeek)}
      </h2>

      <button
        onClick={onNextWeek}
        className="p-2 rounded-full transition-colors duration-300"
        style={{ backgroundColor: bg }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bg)}
      >
        <ChevronRight className="transition-colors duration-300" style={{ color: textColor }} size={24} />
      </button>
    </div>
  );
}
