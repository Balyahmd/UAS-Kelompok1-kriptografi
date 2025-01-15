import { Link } from "react-router-dom";

export default function MenuLink() {
  return (
    <div className=" hidden md:flex space-x-7">
      <Link
        to="/"
        className="font-poppins font-semibold text-white hover:text-gray-300 transition">
        Home
      </Link>
      <Link
        to="/caesar-cipher"
        className="font-poppins font-semibold text-white hover:text-gray-300 transition">
        Caesar Cipher
      </Link>
      <Link
        to="/lsb-steganography"
        className="font-poppins font-semibold text-white hover:text-gray-300 transition">
        LSB Steganography
      </Link>
      <Link
        to="/about"
        className="font-poppins font-semibold text-white hover:text-gray-300 transition">
        About
      </Link>
    </div>
  );
}
