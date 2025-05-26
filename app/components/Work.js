'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    title: 'Development',
    slug: 'uiux-case-study',
    images: [
      '/images/uiux1.png', '/images/uiux2.png', '/images/uiux3.png',
      '/images/uiux4.png', '/images/uiux5.png', '/images/uiux6.png',
      '/images/uiux7.png', '/images/uiux8.png', '/images/uiux9.png',
    ],
  },
  {
    title: 'Graphic Design',
    slug: 'graphic-design',
    images: [
      '/images/graphic1.png', '/images/graphic2.png', '/images/graphic3.png',
      '/images/graphic4.png', '/images/graphic5.png', '/images/graphic6.png',
      '/images/graphic7.png', '/images/graphic8.png', '/images/graphic9.png',
    ],
  },
  {
    title: 'Video Editing',
    slug: 'video-editing',
    images: [],
  },
];

const WorkMenu = ({ projects, hoveredIndex, setHoveredIndex }) => (
  <nav className="w-5xl mx-auto px-4 mt-12">
    <div className="flex justify-evenly items-center border-2 border-[#5EFF7C] bg-black rounded-full overflow-hidden py-2">
      {projects.map((project, index) => {
        const isActive = hoveredIndex === index;
        return (
          <div
            key={project.slug}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`cursor-pointer transition-all duration-300 text-center px-6 py-2 rounded-full ${
              isActive ? 'bg-white text-[#006400]' : 'text-white'
            }`}
          >
            <Link href={`/work/${project.slug}`}>
              <span className="block">{project.title}</span>
            </Link>
          </div>
        );
      })}
    </div>
  </nav>
);

const ImageGrid = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="mx-auto mt-6 max-w-6xl grid grid-cols-3 gap-4 px-6">
      {images.slice(0, 9).map((src, i) => (
        <div key={i} className="w-full h-24 rounded-md overflow-hidden shadow-md">
          <Image
            src={src}
            alt={`Project image ${i + 1}`}
            width={150}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

const Work = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const selectedProject = projects[hoveredIndex];

  return (
    <main className="w-full max-w bg-gray-900 text-white min-h-screen flex flex-col justify-between pt-19 sm:pt-0">
      {/* Hero Section */}
      <section
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center relative px-8 md:px-16"
        style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
      >
        {/* Black Overlay with 50% opacity */}
        <div className="absolute inset-0 bg-black opacity-50" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl text-center mt-5 w-full">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 animate-font-transition">
            My <span className="text-[#5EFF7C]">Work</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            A curated collection of projects where creativity meets functionality.
            From front-end development to UI/UX design and visual storytelling —
            here's what I’ve built.
          </p>

          <WorkMenu
            projects={projects}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
          <ImageGrid images={selectedProject.images} />
        </div>
      </section>
    </main>
  );
};

export default Work;