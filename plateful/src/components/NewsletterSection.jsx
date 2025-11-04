//Made by Adam Abdel Karim
import React from "react";

const NewsletterSection = () => (
  <section className="py-14 px-6 text-center bg-[#fff8f0]">
    <h2 className="text-2xl font-bold text-[#7a1f2a] mb-4">Join Our Community</h2>
    <p className="text-gray-700 mb-6">Get the latest recipes and meal tips delivered to your inbox.</p>
    <form className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-2/3"
      />
      <button className="bg-[#7a1f2a] text-white px-6 py-2 rounded-full hover:bg-[#a02a3d] transition">
        Subscribe
      </button>
    </form>
  </section>
);

export default NewsletterSection;
