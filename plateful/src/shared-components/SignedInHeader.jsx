import { useState } from "react";
import logo from "../assets/plateful-logo.svg";
import profilePic from "../assets/profile-placeholder.svg";

export default function SignedInHeader({ userProfilePicUrl }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleSignOut = () => {
    console.log("Sign out logic here");
  };

  return (
    <header className="bg-[#fff8f0] shadow-sm text-[#7a1f2a]">
      <nav className="py-4 px-6 flex flex-col md:flex-row justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Plateful logo" width={40} height={40} />
          <span className="text-xl font-semibold text-[#7a1f2a]">Plateful</span>
        </a>

        <ul className="flex flex-wrap justify-center md:justify-end mt-3 md:mt-0 gap-4 items-center text-sm font-medium">
          {[
            { name: "Home", href: "/" },
            { name: "Recipes", href: "/recipes" },
            { name: "Add Recipe", href: "/add" },
            { name: "Meal Plans", href: "/meal-plans" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="relative px-1 py-0.5 transition-colors duration-200 hover:text-[#7a1f2a] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#7a1f2a] after:transition-all after:duration-200 hover:after:w-full whitespace-nowrap"
              >
                {item.name}
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
                className="rounded-full object-cover border-2 border-[#7a1f2a]"
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
    </header>
  );
}
