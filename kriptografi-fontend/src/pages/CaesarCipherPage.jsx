import { useState } from "react";
import axios from "axios";

export default function CaesarCipher() {
  const [text, setText] = useState({ plainText: "" }); // State untuk teks input
  const [result, setResult] = useState(""); // State untuk hasil enkripsi/dekripsi
  const [isEncrypting, setIsEncrypting] = useState(true); // Mode enkripsi atau dekripsi

  const handleChange = (event) => {
    setText({ ...text, [event.target.name]: event.target.value });
  };

  const encryptCaesarCipher = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/caesar-chiper/encrypt",
        { plainText: text.plainText }
      );
      // return response.data.result;
      console.log(response.data);
    } catch (error) {
      console.error("Error in encryptCaesarCipher:", error);
      throw error;
    }
  };

  const decryptCaesarCipher = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/caesar-chiper/decrypt",
        { cipherText: text.plainText }
      );
      return response.data; // Pastikan API mengembalikan data dengan format ini
    } catch (error) {
      console.error("Error in decryptCaesarCipher:", error);
      throw error;
    }
  };

  const handleAction = async () => {
    try {
      const actionResult = isEncrypting
        ? await encryptCaesarCipher()
        : await decryptCaesarCipher();
      setResult(actionResult);
    } catch (error) {
      setResult("Terjadi kesalahan. Silakan coba lagi.", error);
    }
  };

  const handleReset = () => {
    setText({ plainText: "" });
    setResult("");
  };

  const toggleMode = () => {
    setIsEncrypting(!isEncrypting);
    setText({ plainText: result });
    setResult("");
  };

  return (
    <div className="font-poppins bg-gray-100 min-h-screen flex justify-center items-center py-10">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-2xl">
        <h1 className="text-center text-3xl font-bold text-[#001E56] mb-6">
          Caesar Cipher Encrypt & Decrypt
        </h1>
        <div className="space-y-8">
          {/* Input Text */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold w-full sm:w-1/3">
              {isEncrypting ? "Plaintext" : "Ciphertext"}
            </label>
            <input
              type="text"
              name="plainText"
              className="w-full sm:w-2/3 border-2 border-gray-400 rounded-md p-3"
              value={text.plainText}
              placeholder={
                isEncrypting ? "Masukkan Plaintext" : "Masukkan Ciphertext"
              }
              onChange={handleChange}
            />
          </div>

          {/* Result */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold w-full sm:w-1/3">
              {isEncrypting ? "Ciphertext" : "Plaintext"}
            </label>
            <input
              type="text"
              className="w-full sm:w-2/3 border-2 border-gray-400 rounded-md p-3 bg-gray-100"
              placeholder="Hasil eksekusi"
              value={result}
              readOnly
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAction}
              className="bg-[#001E56] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto">
              {isEncrypting ? "Enkripsi" : "Deskripsi"}
            </button>
            <button
              onClick={toggleMode}
              className="bg-[#FFA500] text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 w-full sm:w-auto mt-4 sm:mt-0">
              Switch to {isEncrypting ? "Deskripsi" : "Enkripsi"}
            </button>
            <button
              onClick={handleReset}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition duration-300 w-full sm:w-auto mt-4 sm:mt-0">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
