"use client"
import React from "react";
import Image from "next/image";

// --- Icon Components (Extracted for readability) ---

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.019c0 4.438 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.019C22 6.477 17.523 2 12 2z" clipRule="evenodd" />
  </svg>
);

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);


// --- Reusable Components ---

const LinkButton = ({ href, children, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 hover:text-white transition-colors duration-300"
  >
    {icon}
    <span>{children}</span>
  </a>
);

const SkillCard = ({ icon, name }) => (
  <div className="flex items-center p-3 bg-gray-700 rounded-lg space-x-3 transition-transform duration-300 hover:scale-105 hover:bg-gray-600">
    <div className="text-[#5EFF7C]">{icon}</div>
    <span className="text-gray-200 font-medium">{name}</span>
  </div>
);

const ProjectCard = ({ title, description, imageUrl, techStack, liveUrl, repoUrl }) => {
  const fallback = "https://placehold.co/600x400/2a2a2a/5eff7c?text=No+Image";

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-[#5EFF7C] transition-all duration-300 hover:shadow-green-500/20">
      <div className="relative w-full h-56">
        <Image
          src={imageUrl || fallback}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-gray-700 text-xs font-semibold text-[#5EFF7C] rounded-full">{tech}</span>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <LinkButton href={liveUrl} icon={<LinkIcon />}>Live Demo</LinkButton>
          <LinkButton href={repoUrl} icon={<GitHubIcon />}>GitHub</LinkButton>
        </div>
      </div>
    </div>
  );
};

// --- Data (Moved outside component for performance) ---

const skills = [
    { name: "React", icon: <CodeIcon /> },
    { name: "Next.js", icon: <CodeIcon /> },
    { name: "JavaScript", icon: <CodeIcon /> },
    { name: "TypeScript", icon: <CodeIcon /> },
    { name: "Tailwind CSS", icon: <CodeIcon /> },
    { name: "Node.js", icon: <CodeIcon /> },
    { name: "HTML5 & CSS3", icon: <CodeIcon /> },
    { name: "Git & GitHub", icon: <CodeIcon /> },
];

const projects = [
  {
    title: "Photo Gallery App",
    description: "A dynamic, filterable, and sortable photo gallery built with React. Features a dark theme and responsive design.",
    imageUrl: "https://placehold.co/600x400/2a2a2a/5eff7c?text=Gallery+Project",
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Interactive Timeline",
    description: "A professional timeline component to showcase work experience and learning milestones with hover effects.",
    imageUrl: "https://placehold.co/600x400/2a2a2a/5eff7c?text=Timeline+Project",
    techStack: ["Next.js", "CSS Modules", "JSON"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

// --- Main Page Component ---

function AboutMe() {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <section className="mb-24">
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mt-20 mb-12">My Skills</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
                <SkillCard key={skill.name} icon={skill.icon} name={skill.name} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-12">My Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutMe;