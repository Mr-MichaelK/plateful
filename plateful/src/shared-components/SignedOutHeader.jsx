import React, { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import logo from "../assets/plateful-logo.svg";

export default function SignedOutHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const bgColor = theme === "dark" ? "#e6e1dd" : "#fff8f0";
  const textColor = theme === "dark" ? "#5a191f" : "#7a1f2a";
  const linkHoverColor = theme === "dark" ? "#7a2a2e" : "#a02a3d";
  const signUpBg = theme === "dark" ? "#d9bcbc" : "#7a1f2a";
  const signUpHoverBg = theme === "dark" ? "#cfa8a8" : "#5c161f";

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "Meal Plans", href: "/meal-plans" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 shadow-sm transition-colors duration-300"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <nav className="py-4 px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Plateful logo" className="w-10 h-10" />
              <span className="text-xl font-bold">Plateful</span>
            </Link>

            <div className="flex items-center gap-3">
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

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex flex-wrap justify-center md:justify-end mt-3 md:mt-0 space-x-4 text-sm font-medium">
            {menuLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="relative px-1 py-0.5 transition-colors duration-200 hover:opacity-80"
                  style={{ color: textColor }}
                >
                  {item.name}
                  <span
                    className="absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-200"
                    style={{ backgroundColor: linkHoverColor }}
                  />
                </Link>
              </li>
            ))}

            <li className="ml-3">
              <Link
                to="/sign-up"
                className="px-3 py-1.5 rounded-md transition-colors duration-200"
                style={{
                  backgroundColor: signUpBg,
                  color: theme === "dark" ? "#000" : "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = signUpHoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = signUpBg)
                }
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            className="md:hidden shadow-inner flex flex-col items-center py-4 space-y-4 text-base font-medium transition-colors duration-300"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {menuLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className="transition-opacity duration-200 hover:opacity-80"
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/sign-up"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-1.5 rounded-md transition-colors duration-200"
              style={{
                backgroundColor: signUpBg,
                color: theme === "dark" ? "#000" : "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = signUpHoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = signUpBg)
              }
            >
              Sign Up
            </Link>
          </div>
        )}
      </header>

      <div className="h-[70px] md:h-[76px] -mt-px"></div>
    </>
  );
}
