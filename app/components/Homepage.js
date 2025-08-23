'use client';
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';
import { FaLinkedin, FaBehance, FaGithub } from 'react-icons/fa';

const Homepage = () => {
  return (
    <main className="bg-gray-800 text-white min-h-screen flex flex-col justify-between pt-20 sm:pt-0">
      <section
        className="flex-1 flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />

        <div className="relative z-10 w-full px-8 md:px-16 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto mt-5">
          <div className="text-center md:text-left mb-10 md:mb-0 md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-font-transition">
              Hey, I’m <span className="text-[#5EFF7C]">Naman Chaturvedi,</span>
            </h1>
            <p className="text-2xl md:text-5xl text-white mb-8 h-12">
              <Typewriter
                words={['A Developer', 'A UI/UX Designer', 'A Graphic Designer', 'A Video Editor', 'An Avid Gamer']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={60}
                delaySpeed={1000}
              />
            </p>

            <div className="flex justify-center md:justify-start gap-6 mt-6">
              <a
                href="https://www.linkedin.com/in/naman1905"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#5EFF7C] transition duration-300 text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#5EFF7C] transition duration-300 text-2xl"
              >
                <FaGithub />
              </a>
               <a
                href="https://www.behance.net/naman1905"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#5EFF7C] transition duration-300 text-2xl"
              >
                <FaBehance />
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center relative">
            <div className="animate-circle-1 absolute -top-6 -left-1 w-36 h-36 rounded-full bg-[#5EFF7C] opacity-100 z-0" />
            <div className="animate-circle-2 absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-[#5EFF7C] opacity-100 z-0" />
            <div className="w-[19rem] h-[32rem] rounded-full overflow-hidden border-4 border-[#5EFF7C] shadow-lg relative z-10">
              <Image
                src="/path/to/your/profile-picture.jpg"
                alt="Naman Chaturvedi Profile Picture"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Homepage;