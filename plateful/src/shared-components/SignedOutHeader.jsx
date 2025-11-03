import React, { useState } from "react"; // added by Noura
import { Menu, X } from "lucide-react"; // added by Noura
import logo from "../assets/plateful-logo.svg";

// made by Michael Kolanjian and Adam Abdel Karim
// mobile menu and responsiveness added by Noura Hajj Chehade

export default function SignedOutHeader() {
  const [menuOpen, setMenuOpen] = useState(false); // added by Noura

  return (
    <>
      <header className="bg-[#fff8f0] shadow-sm fixed top-0 left-0 w-full z-50">
        {" "}
        {/* added fixed position by Noura */}
        <nav
          aria-label="Main navigation"
          className="py-4 px-6 flex flex-col md:flex-row justify-between items-center"
        >
          {/* added by Noura: wrapper to align logo in center on mobile */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="/" className="flex items-center space-x-2">
              <img src={logo} alt="Plateful logo" className="w-10 h-10" />
              <span className="text-xl font-bold text-[#7a1f2a]">Plateful</span>
            </a>

            {/* added by Noura: burger icon for mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#7a1f2a]"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          <ul className="hidden md:flex flex-wrap justify-center md:justify-end mt-3 md:mt-0 space-x-4 text-sm font-medium text-gray-700">
            {[
              { name: "Home", href: "/" },
              { name: "Recipes", href: "/recipes" },
              { name: "Meal Plans", href: "/meal-plans" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="relative px-1 py-0.5 transition-colors duration-200 hover:text-[#7a1f2a] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#7a1f2a] after:transition-all after:duration-200 hover:after:w-full"
                >
                  {item.name}
                </a>
              </li>
            ))}

            <li className="ml-3">
              <a
                href="/sign-up"
                className="bg-[#7a1f2a] text-white px-3 py-1.5 rounded-md hover:bg-[#5c161f] transition-colors"
              >
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
        {/* added by Noura: mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#fff8f0] shadow-inner flex flex-col items-center text-[#7a1f2a] py-4 space-y-4 text-base font-medium">
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
                className="hover:text-[#a02a3d] transition"
              >
                {item.name}
              </a>
            ))}

            <a
              href="/sign-up"
              onClick={() => setMenuOpen(false)}
              className="bg-[#7a1f2a] text-white px-4 py-1.5 rounded-md hover:bg-[#5c161f] transition-colors"
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
