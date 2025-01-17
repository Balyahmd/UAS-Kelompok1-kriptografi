import { useState } from "react";

// Helper Functions
const stringToBinary = (str) =>
  str
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

const binaryToString = (binary) =>
  binary
    .match(/.{8}/g)
    .map((byte) => String.fromCharCode(parseInt(byte, 2)))
    .join("");

// LSB Encryption Function
const encryptImage = (image, message) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;

  let binaryMessage = stringToBinary(message) + "00000000"; // Add delimiter (null byte)
  let messageIndex = 0;

  // Loop through each pixel (4 bytes per pixel: RGBA)
  for (
    let i = 0;
    i < data.length && messageIndex < binaryMessage.length;
    i += 4
  ) {
    // Modify the least significant bit of each channel (R, G, B)
    for (let j = 0; j < 3; j++) {
      // Only R, G, B channels
      const bit = binaryMessage[messageIndex];
      data[i + j] = (data[i + j] & 0xfe) | parseInt(bit); // Set the LSB to the message bit
      messageIndex++;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL(); // Return the encrypted image as a base64 string
};

// LSB Decryption Function
const decryptImage = (image) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;

  let binaryMessage = "";

  // Extract the least significant bit from each RGB channel
  for (let i = 0; i < data.length; i += 4) {
    for (let j = 0; j < 3; j++) {
      // Only R, G, B channels
      binaryMessage += data[i + j] & 1; // Get the LSB
    }
  }

  // Find the delimiter (null byte) and slice the binaryMessage
  const delimiterIndex = binaryMessage.indexOf("00000000");
  if (delimiterIndex !== -1) {
    binaryMessage = binaryMessage.slice(0, delimiterIndex); // Remove delimiter
  }

  return binaryToString(binaryMessage); // Convert binary back to string
};

export default function LSBSteganographyPage() {
  const [mode, setMode] = useState("encrypt"); // "encrypt" or "decrypt"
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [encryptedImage, setEncryptedImage] = useState(null);
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [fileDetails, setFileDetails] = useState(null); // Store file details

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/bmp" || file.type === "image/jpeg")) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);

      // Set file details
      setFileDetails({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB", // Convert size to KB
        type: file.type,
      });

      if (file) reader.readAsDataURL(file);
    } else {
      alert("Please upload a BMP or JPG file.");
    }
  };

  const handleEncrypt = () => {
    if (!file || !message) {
      alert("Please upload an image and enter a message.");
      return;
    }

    const img = new Image();
    img.src = imagePreview;

    img.onload = () => {
      const encrypted = encryptImage(img, message);
      setEncryptedImage(encrypted);
    };
  };

  const handleDecrypt = () => {
    if (!file) {
      alert("Please upload an image to decrypt.");
      return;
    }

    const img = new Image();
    img.src = imagePreview;

    img.onload = () => {
      const decrypted = decryptImage(img);
      setDecryptedMessage(decrypted);
    };
  };

  const handleReset = () => {
    setMessage("");
    setFile(null);
    setImagePreview(null);
    setEncryptedImage(null);
    setDecryptedMessage("");
    setFileDetails(null); // Reset file details
  };

  const handleDownload = () => {
    if (!encryptedImage) return;
    const link = document.createElement("a");
    link.href = encryptedImage;
    link.download = "encrypted_image.png"; // You can change the file name
    link.click();
  };

  return (
    <div className="font-poppins bg-gray-100 min-h-screen flex justify-center items-center py-10">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-2xl">
        <h1 className="text-center text-3xl font-bold text-[#001E56] mb-6">
          LSB Steganography
        </h1>

        {/* Mode Switch */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setMode("encrypt")}
            className={`px-6 py-2 rounded-l-lg ${
              mode === "encrypt" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}>
            Encrypt
          </button>
          <button
            onClick={() => setMode("decrypt")}
            className={`px-6 py-2 rounded-r-lg ${
              mode === "decrypt" ? "bg-green-600 text-white" : "bg-gray-300"
            }`}>
            Decrypt
          </button>
        </div>

        {/* Conditional Form */}
        {mode === "encrypt" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <label className="text-lg font-semibold w-full sm:w-1/3">
                Masukkan pesan
              </label>
              <input
                type="text"
                className="w-full sm:w-2/3 border-2 border-gray-400 rounded-md p-3"
                placeholder="Masukkan pesan kamu"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <label className="text-lg font-semibold w-full sm:w-1/3">
                Upload Image
              </label>
              <input
                type="file"
                className="w-full sm:w-2/3 border-2 border-gray-400 rounded-md p-3"
                accept="image/bmp, image/jpeg" // Limit file types to BMP and JPG
                onChange={handleFileChange}
              />
            </div>

            {fileDetails && (
              <div className="mt-4">
                <h2 className="text-md font-semibold text-[#001E56]">
                  File Details:
                </h2>
                <p>
                  <strong>Name:</strong> {fileDetails.name}
                </p>
                <p>
                  <strong>Size:</strong> {fileDetails.size}
                </p>
                <p>
                  <strong>Type:</strong> {fileDetails.type}
                </p>
              </div>
            )}

            <button
              onClick={handleEncrypt}
              className="bg-[#001E56] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full">
              Encrypt
            </button>

            {encryptedImage && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-[#001E56] mb-2">
                  Encrypted Image
                </h2>
                <img
                  src={encryptedImage}
                  alt="Encrypted"
                  className="max-w-full h-auto rounded-md"
                />
                <button
                  onClick={handleDownload}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Download Encrypted Image
                </button>
              </div>
            )}
          </div>
        )}

        {mode === "decrypt" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <label className="text-lg font-semibold w-full sm:w-1/3">
                Upload Image
              </label>
              <input
                type="file"
                className="w-full sm:w-2/3 border-2 border-gray-400 rounded-md p-3"
                accept="image/bmp, image/jpeg" // Limit file types to BMP and JPG
                onChange={handleFileChange}
              />
            </div>

            {fileDetails && (
              <div className="mt-4">
                <h2 className="text-md font-semibold text-[#001E56]">
                  File Details:
                </h2>
                <p>
                  <strong>Name:</strong> {fileDetails.name}
                </p>
                <p>
                  <strong>Size:</strong> {fileDetails.size}
                </p>
                <p>
                  <strong>Type:</strong> {fileDetails.type}
                </p>
              </div>
            )}

            <button
              onClick={handleDecrypt}
              className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-full">
              Decrypt
            </button>

            {decryptedMessage && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-[#001E56] mb-2">
                  Decrypted Message
                </h2>
                <p className="text-lg text-gray-800">{decryptedMessage}</p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleReset}
          className="mt-8 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300 w-full">
          Reset
        </button>
      </div>
    </div>
  );
}
