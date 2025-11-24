import React from "react";

export default function PrimaryButton({ text, disabled = false, type = "button" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        w-full
        text-white
        bg-[#7a1f2a]
        rounded-lg
        text-sm
        font-semibold
        py-3
        px-4
        text-center
        shadow-md
        transition
        ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-[#a02a3d]"
        }
      `}
    >
      {text}
    </button>
  );
}
