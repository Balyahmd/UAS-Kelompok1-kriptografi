import React, { useState } from "react";

const CaesarCipher = () => {
  const [plaintext, setPlaintext] = useState("");
  const [result, setResult] = useState("");

  const encryptText = () => {
    const shift = 7; // Caesar Cipher shift
    const encrypted = plaintext
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join("");
    setResult(encrypted);
  };

  return (
    <div className="container">
      <h1>Caesar Cipher +7</h1>
      <div>
        <label>Plaintext:</label>
        <textarea
          rows="3"
          cols="50"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
        ></textarea>
      </div>
      <button onClick={encryptText}>Enkripsi</button>
      <div>
        <h3>Hasil:</h3>
        <textarea rows="3" cols="50" value={result} readOnly></textarea>
      </div>
    </div>
  );
};

export default CaesarCipher;
