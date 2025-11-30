import React, { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo from "../../public/plateful-logo.svg";
import profilePic from "../assets/profile-placeholder.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

// made by Michael Kolanjian and Adam Abdel Karim
// mobile menu and responsiveness added by Noura Hajj Chehade
export default function SignedInHeader({ userProfilePicUrl }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { signOut, user } = useAuth();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const links = [
    { name: "Home", href: "/home" },
    { name: "Recipes", href: "/recipes" },
    { name: "Add Recipe", href: "/add" },
    { name: "Favorites", href: "/favorites" },
    { name: "Meal Plans", href: "/meal-plans" },
    { name: "Contact", href: "/contact" },
  ];

  // subtle dark colors
  const bgColor = theme === "dark" ? "#1a1a1a" : "#fff8f0";
  const textColor = theme === "dark" ? "#f2d8d8" : "#7a1f2a";
  const borderColor = theme === "dark" ? "#7a1f2a" : "#7a1f2a"; // consistent brand
  const hoverBg = theme === "dark" ? "#2a2a2a" : "#f5eee4";
  const dropdownBg = theme === "dark" ? "#1f1f1f" : "#fff0e5";

  const handleSignOut = async () => {
    setDropdownOpen(false);

    try {
      await signOut();

      // redirect to homepage
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Sign out failed:", error);
      Swal.fire({
        icon: "error",
        title: "Sign Out Failed",
        text: "We couldn't complete your request. Please check your connection and try again.",
        confirmButtonColor: "#7a1f2a",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 shadow-sm transition-colors duration-300`}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <nav className="py-4 px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Logo + Mobile Menu */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="Plateful logo" className="w-10 h-10" />
              <span className="text-xl font-semibold">Plateful</span>
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
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-4 mt-3 md:mt-0 text-sm font-medium">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="relative px-1 py-0.5 hover:opacity-80 transition-opacity duration-200"
                  style={{ color: textColor }}
                >
                  {link.name}
                  <span
                    className="absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-200"
                    style={{ backgroundColor: borderColor }}
                  />
                </a>
              </li>
            ))}

            {/* Profile + Dropdown */}
            <li className="relative">
              <button onClick={toggleDropdown} className="p-0">
                <img
                  src={userProfilePicUrl || profilePic}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover border-2 hover:scale-105 transition-transform duration-200"
                  style={{ borderColor }}
                  onError={(e) => (e.currentTarget.src = profilePic)}
                />
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-2 rounded-lg shadow-lg p-4 flex flex-col gap-3 min-w-[150px] z-50 transition-colors duration-300"
                  style={{ backgroundColor: dropdownBg, color: textColor }}
                >
                  <a
                    href="/profile/user-info"
                    className="text-base font-medium hover:opacity-80 transition-opacity duration-200"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleSignOut} // This is the fixed, state-clearing function
                    className="text-base font-medium hover:opacity-80 transition-opacity duration-200 text-left"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div
            className="md:hidden shadow-inner flex flex-col items-center py-4 space-y-4 text-base font-medium transition-colors duration-300"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:opacity-80 transition-opacity duration-200"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/profile/user-info"
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-2 border px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity duration-200"
              style={{ borderColor }}
            >
              <img
                src={userProfilePicUrl || profilePic}
                alt="Your profile"
                className="w-7 h-7 rounded-full"
                style={{ borderColor }}
              />
              <span>Profile</span>
            </a>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-[70px] md:h-[76px]"></div>
    </>
  );
}
