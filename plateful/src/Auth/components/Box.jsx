import React from "react";

export default function Box({ children }) {
  return (
    <div className="mt-8 flex justify-center px-4 pb-16">
      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-xl
          border border-[#f1e6da]
          shadow-lg
          shadow-[0_30px_80px_rgba(122,31,42,0.08)]
          p-8
        "
      >
        {children}
      </div>
    </div>
  );
}
