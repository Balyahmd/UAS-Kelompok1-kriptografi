import { useNavigate } from "react-router-dom";
import imageHome from "../assets/images/img-home.jpg";
export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/caesar-cipher"); // Arahkan ke halaman /another-page
  };
  return (
    <>
      <div className=" text-black flex flex-col items-center justify-start my-20">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">ENKRIPSI DAN DEKRIPSI</h1>
          <p className="text-lg">
            CAESAR CIPHER DIPUTAR 7 DAN STEGANOGRAFI LSB
          </p>
          <img
            className="w-72 flex flex-col items-center justify-center mx-auto "
            src={imageHome}
            alt="image-home"
          />
          <p className="mt-4 text-lg text-gray-600 mb-5">
            Coba cara unik untuk menyembunyikan pesan rahasia atau enkripsi teks
            kamu.
            <br /> Siapkan file gambar favoritmu dan lihat apa yang terjadi??
          </p>
          <button
            onClick={handleClick}
            className="bg-[#001E56] hover:bg-[#001E56] text-white font-bold py-3 px-12 rounded-full focus:outline-none focus:shadow-outline">
            Mulai -{">"}
          </button>
        </div>
      </div>
    </>
  );
}
