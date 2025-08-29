import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
  return (
    <main className="bg-gray-800 text-white min-h-screen flex flex-col justify-center items-center relative">
      {/* Background image and dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      <div className="relative z-20 text-center px-8 max-w-2xl">
        <h1 className="text-4xl md:text-8xl font-extrabold text-white mb-6 animate-font-transition">
          404
        </h1>
        <p className="text-2xl md:text-3xl text-[#5EFF7C] font-semibold mb-6">
          Page Not Found 
        </p>
       <pre className="text-lg md:text-xl text-gray-200 mb-8">
        Hi,
        {'\n'}Naman this side.
        {'\n'}Click the button below.
        </pre>


        <Link
        href="/"
        className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#4cd868] transition duration-300 text-lg"
        >
        Go Back Home
        </Link>
      </div>

      {/* Decorative green circles */}
      <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-[#5EFF7C] opacity-100 animate-circle-1 z-10" />
      <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#5EFF7C] opacity-100 animate-circle-2 z-10" />
    </main>
  );
}
