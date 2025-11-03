// file made by Adam (edited by Noura)
import React from "react";

const Footer = () => (
  <footer className="bg-[#fff8f0] text-center text-gray-600 py-10 border-t mt-0 -mb-px"> 
    <img
      src="/plateful-logo.svg"
      alt="Plateful Logo"
      className="mx-auto w-12 mb-3"
    />
    <p className="text-sm mb-4">© 2025 Plateful. All rights reserved.</p>
    <div className="flex justify-center space-x-4 text-[#7a1f2a] text-xl sm:text-2xl"> {/* added by Noura (for mobile view) */}
      <a
        href="#"
        className="hover:text-[#a02a3d] transition-transform duration-200 hover:scale-110" // added by Noura (for hover animation)
      >
        <i className="fab fa-facebook"></i>
      </a>
      <a
        href="#"
        className="hover:text-[#a02a3d] transition-transform duration-200 hover:scale-110" // added by Noura
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        href="#"
        className="hover:text-[#a02a3d] transition-transform duration-200 hover:scale-110" // added by Noura
      >
        <i className="fab fa-twitter"></i>
      </a>
    </div>

    {/* added by Noura (for mobile view) */}
    <style>
      {`
        @media (max-width: 400px) {
          footer .space-x-4 {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}
    </style>
  </footer>
);

export default Footer;
