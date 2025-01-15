import MenuLink from "./MenuLinks";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#001E56] text-white shadow-lg">
      <div className="container mx-auto px-3 py-4 flex justify-between gap-5 md:justify-start items-center">
        {/* Logo */}
        <div className="text-2xl font-bold font-poppins">
          <a href="/" className="hover:text-gray-300 transition">
            One<span className="text-yellow-500">Vault</span>
          </a>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <MenuLink />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-white focus:outline-none"
          aria-label="Menu"
          onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-16 left-0 w-full bg-[#001E56] text-white py-4 px-6 transform ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          } transition-transform duration-300 ease-in-out md:hidden`}>
          <MenuLink />
        </div>
      </div>
    </nav>
  );
}
