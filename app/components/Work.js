'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    title: 'Development',
    slug: 'uiux-case-study',
    url: 'https://www.behance.net/development-project',
    images: [
      '/images/uiux1.png',
      '/images/uiux2.png',
      '/images/uiux3.png',
      '/images/uiux4.png',
      '/images/uiux5.png',
      '/images/uiux6.png',
    ],
  },
  {
    title: 'Graphic Design',
    slug: 'graphic-design',
    url: 'https://www.behance.net/graphic-design-project',
    images: [
      '/images/graphic1.png',
      '/images/graphic2.png',
      '/images/graphic3.png',
      '/images/graphic4.png',
      '/images/graphic5.png',
      '/images/graphic6.png',
    ],
  },
  {
    title: 'Video Editing',
    slug: 'video-editing',
    url: 'https://www.behance.net/video-editing-project',
    images: [
      '/images/video1.png',
      '/images/video2.png',
      '/images/video3.png',
      '/images/video4.png',
      '/images/video5.png',
      '/images/video6.png',
    ],
  },
];

const WorkMenu = ({ projects, hoveredIndex, setHoveredIndex }) => (
  <nav className="w-full max-w-5xl mx-auto px-4 mt-12">
    <div className="flex justify-evenly items-center py-2">
      {projects.map((project, index) => {
        const isActive = hoveredIndex === index;
        return (
          <div
            key={project.slug}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`cursor-pointer transition-all duration-300 text-center px-6 py-2 font-extrabold text-lg border-b-4 ${
              isActive
                ? 'border-[#5EFF7C] text-[#5EFF7C]'
                : 'border-transparent text-white hover:border-[#5EFF7C]'
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

// Slideshow for Development & Graphic Design projects
const HoverSlideshow = ({ images, projectUrl }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovered && images.length > 1) {
      let i = 0;
      timer = setInterval(() => {
        setIndex((prev) => {
          i++;
          return i < Math.min(3, images.length) ? i : 0;
        });
      }, 500);
    } else {
      setIndex(0);
    }
    return () => clearInterval(timer);
  }, [isHovered, images]);

  return (
    <Link href={projectUrl} target="_blank" rel="noopener noreferrer" className="block">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIndex(0);
        }}
        className="w-full aspect-square rounded-lg border-2 border-white hover:border-[#5EFF7C] hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <Image
          src={images[index]}
          alt={`Project image ${index + 1}`}
          width={300}
          height={300}
          className="object-cover w-full h-full transition-all duration-300"
          priority
        />
      </div>
    </Link>
  );
};

// Single static image for Video Editing project
const SingleImage = ({ image, projectUrl }) => (
  <Link href={projectUrl} target="_blank" rel="noopener noreferrer" className="block">
    <div className="w-full aspect-square rounded-lg border-2 border-white hover:border-[#5EFF7C] hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Image
        src={image}
        alt="Video Editing Project Image"
        width={300}
        height={300}
        className="object-cover w-full h-full"
        priority
      />
    </div>
  </Link>
);

const ImageGrid = ({ project }) => {
  if (!project || !project.images || project.images.length === 0) return null;

  if (project.slug === 'video-editing') {
    return (
      <div className="mx-auto mt-6 max-w-6xl grid grid-cols-3 gap-6 px-6">
        {project.images.slice(0, 6).map((img, i) => (
          <SingleImage key={i} image={img} projectUrl={project.url} />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 max-w-6xl grid grid-cols-3 gap-6 px-6">
      {project.images.slice(0, 9).map((img, i) => {
        // For slideshow: take 3 images cycling from current index
        const slideshowImages = [];
        for (let j = 0; j < 3; j++) {
          slideshowImages.push(project.images[(i + j) % project.images.length]);
        }
        return (
          <HoverSlideshow
            key={i}
            images={slideshowImages}
            projectUrl={project.url}
          />
        );
      })}
    </div>
  );
};

const Work = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const selectedProject = projects[hoveredIndex];

  return (
    <main className="w-full bg-gray-900 text-white min-h-screen flex flex-col justify-between pt-19 sm:pt-0">
      <section
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center relative px-8 md:px-16"
        style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 max-w-4xl text-center mt-5 w-full">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-16 mb-6 animate-font-transition">
            My <span className="text-[#5EFF7C]">Work</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            A curated collection of projects where creativity meets functionality.
            From front-end development to UI/UX design and visual storytelling —
            here&apos; s what I have built.
          </p>

          <WorkMenu
            projects={projects}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
          <ImageGrid project={selectedProject} />
        </div>
      </section>
    </main>
  );
};

export default Work;
