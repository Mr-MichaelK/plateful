//Made by Michael Kolanjian
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext"; // import your ThemeContext
import eyeOpenIcon from "../../assets/eye-open.svg";
import eyeClosedIcon from "../../assets/eye-closed.svg";

export default function ChangePasswordForm() {
  const { theme } = useTheme(); // get current theme
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (setter) => {
    setter((prev) => !prev);
  };

  // Theme-based colors
  const bgColor = theme === "dark" ? "#2a2a2a" : "#fff8f0";
  const borderColor = theme === "dark" ? "#555" : "#ccc";
  const focusBorder = "#7a1f2a";
  const textColor = theme === "dark" ? "#e5e5e5" : "#444";

  return (
    <form className={`flex flex-col text-${textColor}`}>
      <h1 className="text-2xl font-semibold mb-2 text-[#7a1f2a]">
        Change Your Password
      </h1>

      {/* Current Password */}
      <div className="mt-5">
        <label
          htmlFor="currentPassword"
          className={`block font-semibold text-lg mb-3`}
          style={{ color: textColor }}
        >
          Current Password
        </label>
        <div
          className="flex items-center w-full rounded-md transition-colors"
          style={{
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}`,
          }}
        >
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            className="w-full px-3 py-2 bg-transparent text-base focus:outline-none"
            style={{ color: textColor }}
          />
          <span
            className="cursor-pointer pr-3 flex items-center justify-center"
            onClick={() => togglePasswordVisibility(setShowCurrentPassword)}
          >
            <img
              src={showCurrentPassword ? eyeOpenIcon : eyeClosedIcon}
              alt="Toggle password visibility"
              width={28}
              height={28}
            />
          </span>
        </div>
      </div>

      {/* New Password */}
      <div className="mt-5">
        <label
          htmlFor="newPassword"
          className={`block font-semibold text-lg mb-3`}
          style={{ color: textColor }}
        >
          New Password
        </label>
        <div
          className="flex items-center w-full rounded-md transition-colors"
          style={{
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}`,
          }}
        >
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            className="w-full px-3 py-2 bg-transparent text-base focus:outline-none"
            style={{ color: textColor }}
          />
          <span
            className="cursor-pointer pr-3 flex items-center justify-center"
            onClick={() => togglePasswordVisibility(setShowNewPassword)}
          >
            <img
              src={showNewPassword ? eyeOpenIcon : eyeClosedIcon}
              alt="Toggle password visibility"
              width={28}
              height={28}
            />
          </span>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mt-5">
        <label
          htmlFor="confirmPassword"
          className={`block font-semibold text-lg mb-3`}
          style={{ color: textColor }}
        >
          Confirm Password
        </label>
        <div
          className="flex items-center w-full rounded-md transition-colors"
          style={{
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}`,
          }}
        >
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-3 py-2 bg-transparent text-base focus:outline-none"
            style={{ color: textColor }}
          />
          <span
            className="cursor-pointer pr-3 flex items-center justify-center"
            onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
          >
            <img
              src={showConfirmPassword ? eyeOpenIcon : eyeClosedIcon}
              alt="Toggle password visibility"
              width={28}
              height={28}
            />
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 self-end px-6 py-2 rounded-md font-medium text-lg transition-colors"
        style={{
          backgroundColor: "#7a1f2a",
          color: "#fff",
        }}
      >
        Save
      </button>
    </form>
  );
}

