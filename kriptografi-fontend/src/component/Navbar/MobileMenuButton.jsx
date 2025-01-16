import PropTypes from "prop-types";

export default function MobileMenuButton({ toggleMenu, isMenuOpen }) {
  return (
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
  );
}

MobileMenuButton.propTypes = {
  toggleMenu: PropTypes.bool.isRequired,
};

MobileMenuButton.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
};
