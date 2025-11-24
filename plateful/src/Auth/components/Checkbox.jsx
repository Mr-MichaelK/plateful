import React from "react";

export default function Checkbox({ checked, onChange }) {
  return (
    <label className="flex items-start gap-3 text-sm text-[#444] mb-6 cursor-pointer select-none">
      <input
        type="checkbox"
        className="
          mt-1
          h-4
          w-4
          rounded
          border
          border-[#7a1f2a]
          text-[#7a1f2a]
          focus:ring-[#7a1f2a]
          cursor-pointer
        "
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      <span className="leading-snug">
        I agree to the{" "}
        <a
          href="/privacy"
          className="text-[#7a1f2a] underline hover:opacity-80"
        >
          Terms of Service and Privacy Policy
        </a>
      </span>
    </label>
  );
}
