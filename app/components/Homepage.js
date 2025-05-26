'use client';
import { Typewriter } from 'react-simple-typewriter';

const Homepage = () => {
  return (
    <main className="bg-gray-800 text-white min-h-screen flex flex-col justify-between pt-19 sm:pt-0">
      {/* Hero Section */}
      <section
        className="flex-1 flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50" />

        {/* Content */}
        <div className="relative z-10 w-full px-8 md:px-16 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto mt-5">
          {/* Left Text */}
          <div className="text-center md:text-left mb-10 md:mb-0 md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 animate-font-transition">
              Hey, I’m <span className="text-[#5EFF7C]">Naman Chaturvedi,</span>
            </h1>
            <p className="text-5xl md:text-5xl text-white mb-8 h-12">
              <Typewriter
                words={['A Developer','A UI/UX Designer', 'A Graphic Designer', 'A Video Editor', 'An Avid Gamer']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={60}
                delaySpeed={1000}
              />
            </p>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-[23rem] h-[38rem] rounded-full overflow-hidden border-4 border-primary shadow-lg">
              <img
                src="/path/to/your/profile-picture.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;