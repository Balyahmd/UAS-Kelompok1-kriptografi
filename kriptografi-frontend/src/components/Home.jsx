import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="home">
      <h1>Caesar Cipher +7 dan Steganografi LSB</h1>
      <p></p>
      <button><Link to="/caesar" className="start-button">Mulai ➔</Link></button>
    </div>
  );
};

export default Home;
