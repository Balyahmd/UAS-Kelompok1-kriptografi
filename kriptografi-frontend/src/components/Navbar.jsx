import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/caesar">Caesar Cipher</Link></li>
        <li><Link to="/steganografi">Steganografi</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
