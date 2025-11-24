import React from "react";
import { Link } from "react-router-dom";

export default function AuthHeader({ active }) {
  const baseClass =
    "px-4 py-2 font-medium rounded-full text-sm transition border border-[#7a1f2a]";
  const activeClass = "bg-[#7a1f2a] text-white";
  const inactiveClass = "text-[#7a1f2a] bg-transparent hover:bg-[#7a1f2a]/10";

  return (
    <div className="w-full flex justify-end p-4 gap-3">
      <Link
        to="/sign-up"
        className={baseClass + " " + (active === "signup" ? activeClass : inactiveClass)}
      >
        Sign Up
      </Link>

      <Link
        to="/log-in"
        className={baseClass + " " + (active === "login" ? activeClass : inactiveClass)}
      >
        Login
      </Link>
    </div>
  );
}
