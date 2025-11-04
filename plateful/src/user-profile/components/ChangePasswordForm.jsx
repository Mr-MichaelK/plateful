//Made by Michael Kolanjian
import { useState } from "react";
import eyeOpenIcon from "../../assets/eye-open.svg";
import eyeClosedIcon from "../../assets/eye-closed.svg";

export default function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (setter) => {
    setter((prev) => !prev);
  };

  return (
    <form className="flex flex-col text-gray-900">
      <h1 className="text-2xl font-semibold mb-2 text-[#7a1f2a]">
        Change Your Password
      </h1>

      <div className="mt-5">
        <label
          htmlFor="currentPassword"
          className="block text-gray-700 font-semibold text-lg mb-3"
        >
          Current Password
        </label>
        <div className="flex items-center w-full border border-gray-300 rounded-md bg-[#fff8f0] focus-within:border-[#7a1f2a] transition-colors">
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            className="w-full px-3 py-2 bg-transparent text-gray-800 text-base focus:outline-none"
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

      <div className="mt-5">
        <label
          htmlFor="newPassword"
          className="block text-gray-700 font-semibold text-lg mb-3"
        >
          New Password
        </label>
        <div className="flex items-center w-full border border-gray-300 rounded-md bg-[#fff8f0] focus-within:border-[#7a1f2a] transition-colors">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            className="w-full px-3 py-2 bg-transparent text-gray-800 text-base focus:outline-none"
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

      <div className="mt-5">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 font-semibold text-lg mb-3"
        >
          Confirm Password
        </label>
        <div className="flex items-center w-full border border-gray-300 rounded-md bg-[#fff8f0] focus-within:border-[#7a1f2a] transition-colors">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-3 py-2 bg-transparent text-gray-800 text-base focus:outline-none"
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
        className="mt-8 self-end px-6 py-2 rounded-md bg-[#7a1f2a] hover:bg-[#5c161f] text-white font-medium text-lg transition-colors"
      >
        Save
      </button>
    </form>
  );
}
