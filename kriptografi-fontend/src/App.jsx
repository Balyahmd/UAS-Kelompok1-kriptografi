import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer";
import AboutPage from "./pages/AboutPage";
import CaesarCipherPage from "./pages/CaesarCipherPage";
import LSBSteganographyPage from "./pages/LSBSteganographyPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/caesar-cipher" element={<CaesarCipherPage />} />
        <Route path="/lsb-steganography" element={<LSBSteganographyPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
