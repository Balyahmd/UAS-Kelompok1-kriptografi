import { useState } from "react";
import axios from "axios";

export default function LSBSteganographyPage() {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertextImage, setCiphertextImage] = useState(null);
  const [file, setFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [imagePreview, setImagePreview] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const [usePlaintext, setUsePlaintext] = useState(true);

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

  // Handle encryption logic (LSB Steganography)
  const handleEncrypt = () => {
    const formData = new FormData();
    formData.append("file", file); // Attach the image file
    if (usePlaintext) {
      formData.append("plainText", plaintext); // Attach plaintext if selected
    }

    // Call the backend to perform the LSB steganography encryption
    axios
      .post("XXXXXXXXXX", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setCiphertextImage(response.data.ciphertextImage); // Assuming the API returns the encrypted image
      })
      .catch((error) => {
        console.error("There was an error encrypting the data!", error);
      });
  };

  // Handle decryption logic (LSB Steganography)
  const handleDecrypt = () => {
    const formData = new FormData();
    formData.append("file", file); // Attach the encrypted image file

    // Call the backend to decrypt the hidden message from the LSB encoded image
    axios
      .post("xxxxxxxxxxx", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setPlaintext(response.data.plaintext); // Assuming the API returns the decrypted plaintext
      })
      .catch((error) => {
        console.error("There was an error decrypting the data!", error);
      });
  };

  // Reset all fields
  const handleReset = () => {
    setPlaintext("");
    setCiphertextImage(null);
    setFile(null);
    setImagePreview(null);
    setFileDetails(null);
    setUsePlaintext(true); // Reset to default option
  };

  return (
    <div className="font-poppins bg-gray-100 min-h-screen flex justify-center items-center py-10">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-2xl">
        <h1 className="text-center text-3xl font-bold text-[#001E56] mb-6">
          LSB Steganography - Encrypt & Decrypt
        </h1>

        <div className="space-y-8">
          {/* Conditionally render Plaintext input */}
          {usePlaintext && (
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold w-full sm:w-1/3">
                Plaintext
              </label>
              <input
                type="text"
                className="w-full sm:w-2/3 border-2 border-gray-400 rounded-md p-3"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
              />
            </div>
          )}

          {/* Plaintext input */}
          <div className="flex items-center space-x-4 mt-6">
            <label className="text-lg font-semibold">Masukkan Plaintext?</label>
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

          {/* Action buttons */}
          <div className="flex justify-between sm:flex-row gap-3 mt-6">
            <button
              onClick={handleEncrypt}
              className="bg-[#001E56] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto">
              Enkripsi
            </button>
            <button
              onClick={handleDecrypt}
              className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-full sm:w-auto mt-4 sm:mt-0">
              Deskripsi
            </button>
            <button
              onClick={handleReset}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition duration-300 w-full sm:w-auto mt-4 sm:mt-0">
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
                {ciphertextImage ? (
                  <img
                    src={ciphertextImage} // Assuming it's a URL or base64-encoded image
                    alt="Encrypted"
                    className="h-full object-cover rounded-md"
                  />
                ) : (
                  <span className="text-gray-400">No encrypted image yet</span>
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

              {/* Display decrypted plaintext */}
              {plaintext && (
                <div className="mt-4 text-sm text-white">
                  <label className="text-white text-lg font-semibold">
                    Decrypted Plaintext
                  </label>
                  <p>{plaintext}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
