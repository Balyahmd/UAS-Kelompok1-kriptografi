import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CaesarCipher from "./components/CaesarCipher";
import Steganografi from "./components/Steganografi";
import History from "./components/History";
import About from "./components/About";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/caesar" element={<CaesarCipher />} />
        <Route path="/steganografi" element={<Steganografi />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
