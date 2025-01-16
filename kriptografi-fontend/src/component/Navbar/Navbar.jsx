import { useState } from "react";
import NavbarMenu from "./NavbarMenu";
import MobileMenuButton from "./MobileMenuButton";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#001E56] text-white shadow-lg font-poppins">
      <div className="container mx-auto px-3 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold font-poppins">
          <a href="/" className="hover:text-gray-300 transition">
            One<span className="text-yellow-500">Vault</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <NavbarMenu />

        {/* Mobile Menu Button */}
        <MobileMenuButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

        {/* Mobile Sidebar */}
        <MobileSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </nav>
  );
}
