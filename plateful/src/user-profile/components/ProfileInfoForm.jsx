import { useRef, useState } from "react";
import profileIcon from "../../assets/profile-icon.svg";
import uploadIcon from "../../assets/upload-icon.svg";

export default function ProfileInfoForm({ name, email, aboutMe, pfpLink }) {
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

  return (
    <form className="flex flex-col text-gray-900">
      <h1 className="text-2xl font-semibold mb-0">Profile</h1>
      <p className="text-gray-600 text-base mb-3">
        Profile information will be displayed on your dashboard.
      </p>

      <div className="mb-4">
        <label
          htmlFor="imgSelector"
          className="block text-gray-700 font-semibold text-lg mb-4"
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
            <img
              src={uploadIcon}
              alt="Upload Icon"
              className="w-6 h-6 text-gray-900"
            />
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

      <div className="mt-5">
        <label
          htmlFor="username"
          className="block text-gray-700 font-semibold text-lg mb-4"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          defaultValue={name}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-900 text-base focus:outline-none focus:border-[#7a1f2a] border border-gray-300"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold text-lg mb-4"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          defaultValue={email}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-900 text-base focus:outline-none focus:border-[#7a1f2a] border border-gray-300"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="aboutMe"
          className="block text-gray-700 font-semibold text-lg mb-4"
        >
          About Me
        </label>
        <textarea
          id="aboutMe"
          defaultValue={aboutMe || ""}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-900 text-base focus:outline-none focus:border-[#7a1f2a] min-h-[100px] resize-y border border-gray-300"
        />
      </div>

      <button
        type="submit"
        className="mt-8 self-end px-6 py-2 rounded-md bg-[#7a1f2a] hover:bg-[#5c161f] text-white font-medium text-lg transition-colors"
      >
        Save
      </button>
    </form>
  );
}
