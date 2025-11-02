import React from "react";

const Footer = () => (
  <footer className="bg-[#fff8f0] text-center text-gray-600 py-10 border-t mt-10">
    <img src="/plateful-logo.svg" alt="Plateful Logo" className="mx-auto w-12 mb-3" />
    <p className="text-sm mb-4">© 2025 Plateful. All rights reserved.</p>
    <div className="flex justify-center space-x-4 text-[#7a1f2a]">
      <a href="#"><i className="fab fa-facebook"></i></a>
      <a href="#"><i className="fab fa-instagram"></i></a>
      <a href="#"><i className="fab fa-twitter"></i></a>
    </div>
  </footer>
);

export default Footer;
