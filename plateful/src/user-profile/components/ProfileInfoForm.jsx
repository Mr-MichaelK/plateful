//Made by Michael Kolanjian
import { useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import profileIcon from "../../assets/profile-icon.svg";
import uploadIcon from "../../assets/upload-icon.svg";

export default function ProfileInfoForm({ name, email, aboutMe, pfpLink }) {
  const { theme } = useTheme();
  const fileInputRef = useRef(null);
  const [profileImageUrl, setProfileImageUrl] = useState(
    pfpLink || profileIcon
  );

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImageUrl(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Theme-based styles
  const bgColor = theme === "dark" ? "#2a2a2a" : "#fef6ef";
  const inputBg = theme === "dark" ? "#3a3a3a" : "#f3f3f3";
  const textColor = theme === "dark" ? "#e5e5e5" : "#444";
  const borderColor = theme === "dark" ? "#555" : "#ccc";
  const btnBg = theme === "dark" ? "#7a1f2a" : "#7a1f2a";
  const btnHover = theme === "dark" ? "#5c161f" : "#5c161f";

  return (
    <form
      className="flex flex-col transition-colors"
      style={{ color: textColor }}
    >
      <h1 className="text-2xl font-semibold mb-0" style={{ color: "#7a1f2a" }}>
        Profile
      </h1>
      <p
        className="text-base mb-3"
        style={{ color: theme === "dark" ? "#aaa" : "#666" }}
      >
        Profile information will be displayed on your dashboard.
      </p>

      {/* Profile Picture */}
      <div className="mb-4">
        <label
          htmlFor="imgSelector"
          className="block font-semibold text-lg mb-4"
        >
          Profile Picture
        </label>
        <div className="relative w-20 h-20">
          <img
            src={profileImageUrl}
            alt="Profile Picture"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handlePictureClick}
            className="absolute bottom-0 right-0 p-0 bg-transparent border-none cursor-pointer z-10"
          >
            <img src={uploadIcon} alt="Upload Icon" className="w-6 h-6" />
          </button>
          <input
            type="file"
            id="imgSelector"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* Username */}
      <div className="mt-5">
        <label htmlFor="username" className="block font-semibold text-lg mb-4">
          Username
        </label>
        <input
          type="text"
          id="username"
          defaultValue={name}
          className="w-full px-3 py-2 rounded-md text-base focus:outline-none"
          style={{
            backgroundColor: inputBg,
            color: textColor,
            border: `1px solid ${borderColor}`,
          }}
        />
      </div>

      {/* Email */}
      <div className="mt-5">
        <label htmlFor="email" className="block font-semibold text-lg mb-4">
          Email
        </label>
        <input
          type="email"
          id="email"
          defaultValue={email}
          className="w-full px-3 py-2 rounded-md text-base focus:outline-none"
          style={{
            backgroundColor: inputBg,
            color: textColor,
            border: `1px solid ${borderColor}`,
          }}
        />
      </div>

      {/* About Me */}
      <div className="mt-5">
        <label htmlFor="aboutMe" className="block font-semibold text-lg mb-4">
          About Me
        </label>
        <textarea
          id="aboutMe"
          defaultValue={aboutMe || ""}
          className="w-full px-3 py-2 rounded-md text-base focus:outline-none min-h-[100px] resize-y"
          style={{
            backgroundColor: inputBg,
            color: textColor,
            border: `1px solid ${borderColor}`,
          }}
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="mt-8 self-end px-6 py-2 rounded-md text-white font-medium text-lg transition-colors cursor-pointer"
        style={{ backgroundColor: btnBg }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = btnHover)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = btnBg)}
      >
        Save
      </button>
    </form>
  );
}
