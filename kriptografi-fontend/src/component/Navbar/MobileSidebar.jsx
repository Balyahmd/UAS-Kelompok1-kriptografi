import MenuLinks from "./MenuLinks";
import PropTypes from "prop-types";

export default function MobileSidebar({ isMenuOpen, toggleMenu }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-[#001E56] text-white shadow-lg transform ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-500 ease-in-out md:hidden`}>
      {/* Menu Links */}
      <div className="flex flex-col mt-16 px-6 space-y-6">
        <MenuLinks isMobile={true} toggleMenu={toggleMenu} />
      </div>

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-6"
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
      </button>
    </div>
  );
}

MobileSidebar.propTypes = {
  toggleMenu: PropTypes.bool.isRequired,
};

MobileSidebar.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
};
