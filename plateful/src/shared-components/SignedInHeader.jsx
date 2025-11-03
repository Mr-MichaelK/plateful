import React, { useState } from "react"; // added by Noura
import { Menu, X } from "lucide-react"; // added by Noura
import logo from "../../public/plateful-logo.svg";
import profilePic from "../assets/profile-placeholder.svg";

// made by Michael Kolanjian and Adam Abdel Karim
// mobile menu and responsiveness added by Noura Hajj Chehade

export default function SignedInHeader({ userProfilePicUrl }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleSignOut = () => {
    console.log("Sign out logic here");
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "Add Recipe", href: "/add" },
    { name: "Favorites", href: "/favorites" },
    { name: "Meal Plans", href: "/meal-plans" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="bg-[#fff8f0] shadow-sm fixed top-0 left-0 w-full z-50 text-[#7a1f2a]">
        <nav className="py-4 px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="Plateful logo" className="w-10 h-10" />
              <span className="text-xl font-semibold">Plateful</span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          <ul className="hidden md:flex items-center space-x-4 mt-3 md:mt-0 text-sm font-medium">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="relative px-1 py-0.5 hover:text-[#7a1f2a] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#7a1f2a] after:transition-all after:duration-200 hover:after:w-full whitespace-nowrap"
                >
                  {link.name}
                </a>
              </li>
            ))}

            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="p-0 bg-transparent border-none cursor-pointer"
              >
                <img
                  src={userProfilePicUrl || profilePic}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover border-2 border-[#7a1f2a] hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    e.currentTarget.src = profilePic;
                  }}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-[#fff0e5] rounded-lg shadow-lg p-4 flex flex-col gap-3 min-w-[150px] z-50">
                  <a
                    href="/profile/user-info"
                    className="text-[#7a1f2a] text-base font-medium hover:text-[#b34747] whitespace-nowrap cursor-pointer"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="text-[#7a1f2a] text-base font-medium hover:text-[#b34747] text-left whitespace-nowrap cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-[#fff8f0] shadow-inner flex flex-col items-center text-[#7a1f2a] py-4 space-y-4 text-base font-medium">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#a02a3d] transition"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/profile/user-info"
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-2 border border-[#7a1f2a] px-3 py-1.5 rounded-lg hover:bg-[#7a1f2a] hover:text-white transition"
            >
              <img
                src={userProfilePicUrl || profilePic}
                alt="Your profile"
                className="w-7 h-7 rounded-full border border-[#7a1f2a]"
              />
              <span>Profile</span>
            </a>
          </div>
        )}
      </header>

      <div className="h-[70px] md:h-[76px]"></div>
    </>
  );
}
