import React from "react";

export default function Title({ heading, subheading }) {
  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-[#7a1f2a] mb-3">
        {heading}
      </h1>
      <p className="text-base text-[#6b6b6b] leading-snug">
        {subheading}
      </p>
    </div>
  );
}
