'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutMePage() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="w-full bg-gray-900 text-white min-h-screen flex flex-col justify-between pt-20 sm:pt-0">
        <section
          className="flex-1 flex flex-col items-center justify-center bg-cover bg-center relative px-8 md:px-16"
          style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative z-10 max-w-4xl text-center mt-5 w-full">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-16 mb-6">
              About <span className="text-[#5EFF7C]">Me</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Hey! I am Naman Chaturvedi — a passionate designer and developer with a love for creativity and technology.
              From designing intuitive UI/UX interfaces and graphics to editing videos and building modern web experiences,
              I enjoy crafting things that make an impact.
            </p>

            <p className="text-md md:text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              I started my journey in graphic design and gradually expanded into UI/UX and full-stack development.
              I believe design is not just how it looks — it&rsquo;s how it works. I&rsquo;m always experimenting, learning, and pushing boundaries.
            </p>

            <p className="text-md md:text-lg text-gray-400 max-w-2xl mx-auto">
              Outside of work, I love gaming (check out my gaming channel!), exploring AI, and staying active with workouts and meditation.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
