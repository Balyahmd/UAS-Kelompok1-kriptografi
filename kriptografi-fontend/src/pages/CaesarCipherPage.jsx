import { useState } from "react";
import axios from "axios";

export default function CaesarCipherPage() {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const [usePlaintext, setUsePlaintext] = useState(true); // Default to using plaintext

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Preview the image
    };
    if (file) {
      setFileDetails({
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(2) + " KB", // Convert size to KB
        date: new Date(file.lastModified).toLocaleDateString(),
      });
      reader.readAsDataURL(file);
    }
  };

  // Handle encryption logic (Caesar Cipher + LSB Steganography)
  const handleEncrypt = () => {
    const formData = new FormData();
    formData.append("file", file); // Attach the image file
    if (usePlaintext) {
      formData.append("plainText", plaintext); // Attach plaintext if selected
    }

    axios
      .post("http://XXXXXXXXXXXXX", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setCiphertext(response.data.ciphertext); // Assuming API returns the encrypted image or ciphertext
      })
      .catch((error) => {
        console.error("There was an error encrypting the data!", error);
      });
  };

  // Reset all fields
  const handleReset = () => {
    setPlaintext("");
    setCiphertext("");
    setFile(null);
    setImagePreview(null);
    setFileDetails(null);
    setUsePlaintext(true); // Reset to default option
  };

  return (
    <div className="font-poppins bg-gray-100 min-h-screen flex justify-center items-center py-10">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-2xl">
        <h1 className="text-center text-3xl font-bold text-[#001E56] mb-6">
          CAESAR CIPHER & LSB STEGANOGRAPHY
        </h1>

        <div className="space-y-8">
          {/* Plaintext input */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold w-full sm:w-1/3">
              Plaintext
            </label>
            <input
              type="text"
              className="w-full sm:w-2/3 border-2 border-gray-400 rounded-md p-3"
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              disabled={!usePlaintext} // Disable input if option is not selected
            />
          </div>

          {/* File Upload */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold w-full sm:w-1/3">
              Upload Image
            </label>
            <div className="w-full sm:w-2/3 border-2 border-gray-400 rounded-md p-3">
              <input
                type="file"
                className="w-full h-10 text-sm border-none"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Option to Include Plaintext or not */}
          <div className="flex items-center space-x-4 mt-6">
            <label className="text-lg font-semibold">Include Plaintext?</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="usePlaintext"
                name="plaintextOption"
                checked={usePlaintext}
                onChange={() => setUsePlaintext(true)}
              />
              <label className="ml-2 text-gray-700">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="noPlaintext"
                name="plaintextOption"
                checked={!usePlaintext}
                onChange={() => setUsePlaintext(false)}
              />
              <label className="ml-2 text-gray-700">No</label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleEncrypt}
              className="bg-[#001E56] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto">
              Enkripsi
            </button>
            <button
              onClick={handleReset}
              className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition duration-300 w-full sm:w-auto mt-4 sm:mt-0">
              Reset
            </button>
          </div>

          {/* Display encrypted image and file details */}
          <div className="mt-8">
            <div className="border-2 border-gray-300 p-4 rounded-lg shadow-md bg-[#106EBE]">
              <label className="text-white text-lg font-semibold">
                Encrypted Image
              </label>
              <div className="bg-gray-200 h-48 mt-2 flex items-center justify-center rounded-lg">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Encrypted"
                    className="h-full object-cover rounded-md"
                  />
                ) : (
                  <span className="text-gray-400">No image selected</span>
                )}
              </div>

              {/* Display file details */}
              {fileDetails && (
                <div className="mt-4 text-sm text-white">
                  <p>
                    <strong>Name:</strong> {fileDetails.name}
                  </p>
                  <p>
                    <strong>Type:</strong> {fileDetails.type}
                  </p>
                  <p>
                    <strong>Size:</strong> {fileDetails.size}
                  </p>
                  <p>
                    <strong>Uploaded on:</strong> {fileDetails.date}
                  </p>
                </div>
              )}

              {/* Display the encrypted image (ciphertext) */}
              {ciphertext && (
                <div className="mt-4">
                  <label className="text-white text-lg font-semibold">
                    Ciphertext
                  </label>
                  <div className="bg-gray-200 h-48 mt-2 flex items-center justify-center rounded-lg">
                    <img
                      src={ciphertext} // Assuming ciphertext is an image URL or base64 data
                      alt="Encrypted"
                      className="h-full object-cover rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
