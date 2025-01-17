export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="bg-gray-50 shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-[#001E56] mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Aplikasi ini merupakan tugas Ujian Akhir Semester 7 dari Mata Kuliah{" "}
          <span className="font-semibold text-[#001E56]">Kriptografi</span>.
          Kami adalah tim mahasiswa yang berkomitmen untuk belajar dan
          menerapkan ilmu kriptografi secara kreatif melalui pengembangan
          aplikasi ini.
        </p>

        <h2 className="text-2xl font-semibold text-[#001E56] mb-4">
          Team Members
        </h2>
        <table className="table-auto w-full text-left text-gray-700">
          <tbody className="space-y-3">
            <tr>
              <td className="py-2">Rangga Krisna Putra</td>
              <td className="py-2">21104410068</td>
            </tr>
            <tr>
              <td className="py-2">Nugroho Gusti Bintang Fajar</td>
              <td className="py-2">21104410035</td>
            </tr>
            <tr>
              <td className="py-2">Balya Ahmad Waffa</td>
              <td className="py-2">21104410052</td>
            </tr>
            <tr>
              <td className="py-2">Eza Rafli Vernica Saputra</td>
              <td className="py-2">21104410075</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8 text-center">
          <div className="bg-gray-200 p-6 rounded-lg">
            <p className="text-gray-600">
              &quot;Kami berharap aplikasi ini dapat menjadi solusi inovatif
              dalam pembelajaran dan penerapan kriptografi di dunia nyata.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
