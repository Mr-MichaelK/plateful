import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function AuthHeader({ active }) {
  const { theme } = useTheme();

  const baseClass =
    "px-4 py-2 font-medium rounded-full text-sm transition border";
  
  const activeClass = theme === "dark"
    ? "bg-[#7a1f2a] text-white border-[#7a1f2a]"
    : "bg-[#7a1f2a] text-white border-[#7a1f2a]";
  
  const inactiveClass = theme === "dark"
    ? "text-gray-400 bg-transparent hover:bg-[#7a1f2a]/20 border-[#7a1f2a]"
    : "text-[#7a1f2a] bg-transparent hover:bg-[#7a1f2a]/10 border-[#7a1f2a]";

  return (
    <div className="w-full flex justify-end p-4 gap-3">
      <Link
        to="/sign-up"
        className={`${baseClass} ${active === "signup" ? activeClass : inactiveClass}`}
      >
        Sign Up
      </Link>

      <Link
        to="/log-in"
        className={`${baseClass} ${active === "login" ? activeClass : inactiveClass}`}
      >
        Login
      </Link>
    </div>
  );
}
