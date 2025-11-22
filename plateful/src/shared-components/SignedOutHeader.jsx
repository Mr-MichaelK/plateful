import React, { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/plateful-logo.svg";

// made by Michael Kolanjian and Adam Abdel Karim
// mobile menu and responsiveness added by Noura Hajj Chehade
export default function SignedOutHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // subtle dark mode colors
  const bgColor = theme === "dark" ? "#e6e1dd" : "#fff8f0"; // slightly darker beige
  const textColor = theme === "dark" ? "#5a191f" : "#7a1f2a"; // slightly darker brown
  const linkHoverColor = theme === "dark" ? "#7a2a2e" : "#a02a3d";
  const signUpBg = theme === "dark" ? "#d9bcbc" : "#7a1f2a";
  const signUpHoverBg = theme === "dark" ? "#cfa8a8" : "#5c161f";

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 shadow-sm transition-colors duration-300"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <nav className="py-4 px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="/" className="flex items-center space-x-2">
              <img src={logo} alt="Plateful logo" className="w-10 h-10" />
              <span className="text-xl font-bold">Plateful</span>
            </a>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition hover:bg-gray-200 dark:hover:bg-gray-300"
              >
                {theme === "light" ? (
                  <Moon className="w-6 h-6" />
                ) : (
                  <Sun className="w-6 h-6 text-yellow-400" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex flex-wrap justify-center md:justify-end mt-3 md:mt-0 space-x-4 text-sm font-medium">
            {[
              { name: "Home", href: "/" },
              { name: "Recipes", href: "/recipes" },
              { name: "Meal Plans", href: "/meal-plans" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="relative px-1 py-0.5 transition-colors duration-200 hover:opacity-80"
                  style={{ color: textColor }}
                >
                  {item.name}
                  <span
                    className="absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-200"
                    style={{ backgroundColor: linkHoverColor }}
                  />
                </a>
              </li>
            ))}

            <li className="ml-3">
              <a
                href="/sign-up"
                className="px-3 py-1.5 rounded-md transition-colors duration-200"
                style={{
                  backgroundColor: signUpBg,
                  color: theme === "dark" ? "#000" : "#fff",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = signUpHoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = signUpBg)}
              >
                Sign Up
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden shadow-inner flex flex-col items-center py-4 space-y-4 text-base font-medium transition-colors duration-300"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {[
              { name: "Home", href: "/" },
              { name: "Recipes", href: "/recipes" },
              { name: "Meal Plans", href: "/meal-plans" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="transition-opacity duration-200 hover:opacity-80"
              >
                {item.name}
              </a>
            ))}

            <a
              href="/sign-up"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-1.5 rounded-md transition-colors duration-200"
              style={{
                backgroundColor: signUpBg,
                color: theme === "dark" ? "#000" : "#fff",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = signUpHoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = signUpBg)}
            >
              Sign Up
            </a>
          </div>
        )}
      </header>

      <div className="h-[70px] md:h-[76px] -mt-px"></div>
    </>
  );
}
