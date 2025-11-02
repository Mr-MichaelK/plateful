import logo from "../assets/plateful-logo.svg";
import profilePic from "../assets/profile-placeholder.svg";

// made by Michael Kolanjian and Adam Abdel Karim

export default function SignedInHeader() {
  return (
    <header className="bg-[#fff8f0] shadow-sm">
      <nav
        aria-label="Main navigation"
        className="py-4 px-6 flex flex-col md:flex-row justify-between items-center"
      >
        <a href="/" className="flex items-center space-x-2">
          <img src={logo} alt="Plateful logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-[#7a1f2a]">Plateful</span>
        </a>

        <ul className="flex flex-wrap justify-center md:justify-end mt-3 md:mt-0 space-x-4 text-sm font-medium text-gray-700 items-center">
          {[
            { name: "Home", href: "/" },
            { name: "Recipes", href: "/recipes" },

            //edited by Noura (added "Add Recipe" link)
            { name: "Add Recipe", href: "/add" },
            
            { name: "Meal Plans", href: "/meal-plans" },
            { name: "Contact", href: "/contact" },

          ].map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="relative px-1 py-0.5 transition-colors duration-200 hover:text-[#7a1f2a] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#7a1f2a] after:transition-all after:duration-200 hover:after:w-full"
              >
                {item.name}
              </a>
            </li>
          ))}

          <li className="ml-3">
            <a href="/profile" className="block">
              <img
                src={profilePic}
                alt="Your profile"
                className="w-9 h-9 rounded-full border-2 border-[#7a1f2a] hover:scale-105 transition-transform duration-200"
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
