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
              I enjoy crafting things that make an impact. I started my journey in graphic design and gradually expanded into UI/UX and full-stack development.
            </p>

            {/* Skills Section */}
            <div className="mt-12 max-w-5xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Skills</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: 'Graphic Design', icons: 2 },
                  { name: 'UI/UX Design', icons: 2 },
                  { name: 'Video Editing', icons: 3 },
                  { name: 'HTML, CSS & JS', icons: 3 },
                  { name: 'React and Next JS', icons: 2 },
                  ,
                ].map((skill, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="text-lg font-medium text-gray-200 mb-3">{skill.name}</div>
                    <div className="flex justify-center gap-2">
                      {Array.from({ length: skill.icons }).map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-white rounded-sm" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
