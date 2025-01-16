import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function MenuLinks({ isMobile, toggleMenu }) {
  return (
    <div
      className={`${
        isMobile ? "flex flex-col space-y-4" : "hidden md:flex space-x-7"
      }`}>
      <Link
        to="/"
        className="font-poppins font-semibold text-white hover:text-gray-300 transition"
        onClick={toggleMenu}>
        Home
      </Link>
      <Link
        to="/caesar-cipher"
        className="font-poppins font-semibold text-white hover:text-gray-300 transition"
        onClick={toggleMenu}>
        Caesar Cipher
      </Link>
      <Link
        to="/lsb-steganography"
        className="font-poppins font-semibold text-white hover:text-gray-300 transition"
        onClick={toggleMenu}>
        LSB Steganography
      </Link>
      <Link
        to="/about"
        className="font-poppins font-semibold text-white hover:text-gray-300 transition"
        onClick={toggleMenu}>
        About
      </Link>
    </div>
  );
}

MenuLinks.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

MenuLinks.propTypes = {
  toggleMenu: PropTypes.bool.isRequired,
};
