import React from "react";

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="w-full mb-6 text-sm">
      <label className="block text-[#7a1f2a] font-medium mb-2">
        {label}
      </label>

      <input
        className="
          w-full
          rounded-lg
          border
          border-[#d5c9be]
          bg-white
          px-3
          py-2.5
          text-sm
          text-[#444]
          placeholder:text-[#b8b8b8]
          outline-none
          focus:ring-2
          focus:ring-[#7a1f2a]
          focus:border-[#7a1f2a]
          transition
        "
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
