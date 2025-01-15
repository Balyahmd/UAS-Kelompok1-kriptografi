import React from "react";

const Steganografi = () => {
  return (
    <div className="steganografi">
      <h1>Steganografi LSB</h1>
      <form>
        <label>Pesan:</label>
        <textarea rows="4"></textarea>
        <label>Gambar:</label>
        <input type="file" />
        <button>Masukkan Pesan</button>
        <button>Ekstrak Pesan</button>
      </form>
    </div>
  );
};

export default Steganografi;
