//Made by Michael Kolanjian
import { useTheme } from "../../context/ThemeContext";
import trashIcon from "../../assets/trash-icon.svg";
import repeatIcon from "../../assets/repeat-icon.svg";

export default function DangerZoneSection() {
  const { theme } = useTheme();

  // Theme-based colors
  const sectionBg = theme === "dark" ? "#2a2a2a" : "#fff8f0";
  const sectionBorder = theme === "dark" ? "#555" : "#ccc";
  const textColor = theme === "dark" ? "#e5e5e5" : "#444";
  const subTextColor = theme === "dark" ? "#aaa" : "#666";
  const dangerBtnBg = theme === "dark" ? "#7a1f2a" : "#7a1f2a";
  const dangerBtnHover = theme === "dark" ? "#5c161f" : "#5c161f";
  const resetBtnText = theme === "dark" ? "#f9c8c8" : "#7a1f2a";
  const resetBtnHoverBg = theme === "dark" ? "#3a1a1a" : "#fff0e5";
  const resetBtnBorder = theme === "dark" ? "#555" : "#ccc";

  return (
    <section
      className="flex flex-col rounded-xl p-4 md:p-8 shadow-sm transition-colors"
      style={{
        backgroundColor: sectionBg,
        border: `1px solid ${sectionBorder}`,
        color: textColor,
      }}
    >
      <h1 className="text-2xl font-semibold mb-0" style={{ color: "#7a1f2a" }}>
        Danger Zone
      </h1>
      <p className="text-base mb-6" style={{ color: subTextColor }}>
        Careful, these actions cannot be undone.
      </p>

      {/* Reset Progress Button */}
      <button
        className="flex items-center gap-4 w-[200px] px-3 py-2 mb-4 rounded-md font-medium text-base transition-colors"
        style={{
          color: resetBtnText,
          border: `1px solid ${resetBtnBorder}`,
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = resetBtnHoverBg)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <img src={repeatIcon} alt="Reset Progress Icon" width={25} height={25} />
        <p className="m-0 flex-grow text-left">Reset Progress</p>
      </button>

      {/* Delete Account Button */}
      <button
        className="flex items-center gap-4 w-[200px] px-3 py-2 mb-4 rounded-md font-medium text-base transition-colors"
        style={{
          color: "#fff",
          backgroundColor: dangerBtnBg,
          border: `1px solid ${dangerBtnBg}`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dangerBtnHover)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = dangerBtnBg)}
      >
        <img src={trashIcon} alt="Delete Account Icon" width={25} height={25} />
        <p className="m-0 flex-grow text-left">Delete Account</p>
      </button>
    </section>
  );
}
