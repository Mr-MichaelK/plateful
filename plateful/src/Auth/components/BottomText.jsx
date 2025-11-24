import React from "react";

export default function BottomText({ textBefore, linkHref, linkText }) {
  return (
    <p className="text-center text-xs text-[#6b6b6b] mt-6">
      {textBefore}{" "}
      <a
        href={linkHref}
        className="text-[#7a1f2a] font-medium underline hover:opacity-80"
      >
        {linkText}
      </a>
    </p>
  );
}
