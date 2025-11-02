import trashIcon from "../../assets/trash-icon.svg";
import repeatIcon from "../../assets/repeat-icon.svg";

export default function DangerZoneSection() {
  return (
    <section className="flex flex-col bg-[#fff8f0] border border-gray-300 rounded-xl p-8 md:p-16 text-gray-900 shadow-sm">
      <h1 className="text-2xl font-semibold mb-0 text-[#7a1f2a]">
        Danger Zone
      </h1>
      <p className="text-gray-600 text-base mb-6">
        Careful, these actions cannot be undone.
      </p>

      <button className="flex items-center gap-4 w-[200px] px-3 py-2 mb-4 text-[#7a1f2a] border border-gray-400 rounded-md font-medium text-base hover:bg-[#fff0e5] transition-colors">
        <img
          src={repeatIcon}
          alt="Reset Progress Icon"
          width={25}
          height={25}
        />
        <p className="m-0 flex-grow text-left">Reset Progress</p>
      </button>

      <button className="flex items-center gap-4 w-[200px] px-3 py-2 mb-4 text-white bg-[#7a1f2a] border border-[#7a1f2a] rounded-md font-medium text-base hover:bg-[#5c161f] transition-colors">
        <img src={trashIcon} alt="Delete Account Icon" width={25} height={25} />
        <p className="m-0 flex-grow text-left">Delete Account</p>
      </button>
    </section>
  );
}
