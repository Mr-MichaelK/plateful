//Made by Adam Abdel Karim
import React from "react";

const Navbar = () => (
  <nav className="bg-[#fff8f0] py-4 px-6 flex flex-col md:flex-row justify-between items-center shadow-sm">
    <div className="flex items-center space-x-2">
      <img src="/logo.png" alt="Plateful Logo" className="w-10 h-10" />
      <h1 className="text-xl font-bold text-[#7a1f2a]">Plateful</h1>
    </div>

    <ul className="flex flex-wrap justify-center md:justify-end mt-3 md:mt-0 space-x-4 text-sm font-medium text-gray-700">
      <li><a href="/home" className="hover:text-[#7a1f2a]">Home</a></li>
      <li><a href="/recipes" className="hover:text-[#7a1f2a]">Recipes</a></li>
      <li><a href="#" className="hover:text-[#7a1f2a]">Meal Plans</a></li>
      <li><a href="#" className="hover:text-[#7a1f2a]">Contact</a></li>
    </ul>
  </nav>
);

export default Navbar;
