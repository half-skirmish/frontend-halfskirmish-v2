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

const PaintbrushIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

const ContactButton = ({ href, children, icon, isEmail = false }) => (
  <a
    href={isEmail ? `mailto:${href}` : href}
    target={isEmail ? "_self" : "_blank"}
    rel={isEmail ? "" : "noopener noreferrer"}
    className="flex items-center justify-center space-x-3 p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-[#5EFF7C] hover:bg-gray-700 transition-all duration-300 hover:shadow-green-500/20 group"
  >
    <div className="text-[#5EFF7C] group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <span className="text-gray-200 font-medium group-hover:text-white">{children}</span>
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
      <div className="relative w-full">
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
    { name: "Next.js", icon: <CodeIcon /> },
    { name: "React", icon: <CodeIcon /> },
    { name: "Express JS", icon: <CodeIcon /> },
    { name: "MongoDB", icon: <CodeIcon /> },
    { name: "PostgreSQL", icon: <CodeIcon /> },
    { name: "Tailwind CSS", icon: <CodeIcon /> },
    { name: "HTML5 & CSS3", icon: <CodeIcon /> },
    { name: "Git & GitHub", icon: <CodeIcon /> },
    { name: "Adobe Photoshop", icon: <PaintbrushIcon /> },
    { name: "Adobe Illustrator", icon: <PaintbrushIcon /> },
    { name: "Adobe Premiere Pro", icon: <PaintbrushIcon /> },
    { name: "Adobe After Effects", icon: <PaintbrushIcon /> },
    { name: "Adobe XD", icon: <PaintbrushIcon /> },
    { name: "Figma", icon: <PaintbrushIcon /> },
];

const projects = [
  {
    title: "Geolocation Weather App",
    description: "A weather app that fetches real-time weather data based on user's geolocation using Free WeatherAPI.",
    techStack: ["Next.js", "Tailwind CSS", "WeatherAPI", "React Charts"],
    liveUrl: "https://weather.halfskirmish.com",
    repoUrl: "https://github.com/naman-1905/Weather-App",
  },
      {
    title: "Astra Bot",
    description: "A Chatbot built using Gemma 1 Billion parameters model.",
    techStack: ["Next.js", "Tailwind CSS", "Google Gemma API", "Vercel's New Streamdown Feature"],
    repoUrl: "https://github.com/naman-1905/AI-Chatbot",
    liveUrl: "https://chat.halfskirmish.com",
  },
    {
    title: "Half Skirmish Portfolio & Blog",
    description: "A portfolio website showcasing my projects, skills, and experience.",
    techStack: ["Next.js", "Tailwind CSS", "MongoDB", "Dynamic Routing"],
    liveUrl: "/",
    repoUrl: "https://github.com/half-skirmish/frontend-halfskirmish-v2",
  },
  {
    title: "Notes App",
    description: "A Note taking App built using Next.js, Tailwind CSS, MongoDB and Express.js.",
    techStack: ["Next.js", "Tailwind CSS", "MongoDB", "Express.js", "React Modules"],
    liveUrl: "https://notes.halfskirmish.com",
    repoUrl: "https://github.com/naman-1905/Notes-App",
  },
  {
    title: "Kahichan Japanese App",
    description: "A Japanese learning app with flashcards, quizzes, and spaced repetition to help users master the language effectively.",
    techStack: ["NextJS", "MongoDB", "Tailwind CSS", "PostGreSQL", "FastAPI"],
    liveUrl: "https://kahichandev.halfskirmish.com/",
    repoUrl: "https://github.com/kahitoz-infra/kahitoz-japanese-app",
  },
   {
    title: "Blog Admin Panel",
    description: "A Blog Admin Panel built using Next.js, Tailwind CSS, MongoDB and Express.js.",
    techStack: ["Next.js", "Tailwind CSS", "MongoDB", "Dynamic Routing"],
    repoUrl: "https://github.com/half-skirmish/backend-halfskirmish",
  }

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

        <section className="mb-24">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-12">My Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-12">Let's Connect</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-400 text-center mb-8 text-lg">
              I'm always open to discussing new opportunities, collaborating on interesting projects, or just having a chat about technology and development.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <ContactButton 
                href="https://linkedin.com/in/naman1905" 
                icon={<LinkedInIcon />}
              >
                LinkedIn
              </ContactButton>
              <ContactButton 
                href="namansdiaries@gmail.com" 
                icon={<EmailIcon />}
                isEmail={true}
              >
                Email Me
              </ContactButton>
              <ContactButton 
                href="https://github.com/naman-1905" 
                icon={<GitHubIcon />}
              >
                GitHub
              </ContactButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutMe;