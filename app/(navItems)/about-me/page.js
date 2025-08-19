"use client"
import React from 'react';

// --- Reusable Components ---

// A small reusable component for social media/project links.
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

// A reusable component to display individual skills.
const SkillCard = ({ icon, name }) => (
    <div className="flex items-center p-3 bg-gray-700 rounded-lg space-x-3 transition-transform duration-300 hover:scale-105 hover:bg-gray-600">
        <div className="text-[#5EFF7C]">{icon}</div>
        <span className="text-gray-200 font-medium">{name}</span>
    </div>
);

// A card to display a single project.
const ProjectCard = ({ title, description, imageUrl, techStack, liveUrl, repoUrl }) => {
    const linkIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;
    const githubIcon = <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.019c0 4.438 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.019C22 6.477 17.523 2 12 2z" clipRule="evenodd" /></svg>;

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-[#5EFF7C] transition-all duration-300 hover:shadow-green-500/20">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/ffffff?text=Project+Image'; }} />
            <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 mb-4">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {techStack.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-gray-700 text-xs font-semibold text-[#5EFF7C] rounded-full">{tech}</span>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <LinkButton href={liveUrl} icon={linkIcon}>Live Demo</LinkButton>
                    <LinkButton href={repoUrl} icon={githubIcon}>GitHub</LinkButton>
                </div>
            </div>
        </div>
    );
};


// --- Main Skills & Projects Component ---
function AboutMe() {
    // Placeholder data for projects
    const projects = [
        {
            title: "Photo Gallery App",
            description: "A dynamic, filterable, and sortable photo gallery built with React. Features a dark theme and responsive design.",
            imageUrl: "https://placehold.co/600x400/2a2a2a/5eff7c?text=Gallery+Project",
            techStack: ["React", "Tailwind CSS", "JavaScript"],
            liveUrl: "#",
            repoUrl: "#"
        },
        {
            title: "Interactive Timeline",
            description: "A professional timeline component to showcase work experience and learning milestones with hover effects.",
            imageUrl: "https://placehold.co/600x400/2a2a2a/5eff7c?text=Timeline+Project",
            techStack: ["React", "CSS Modules", "JSON"],
            liveUrl: "#",
            repoUrl: "#"
        }
    ];

    // SVG icons for skills
    const skillIcons = {
        react: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="3" /><circle cx="12"cy="12" r="7" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" /></svg>,
        tailwind: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12c-3.142 0 -6 1.664 -6 4c0 1.48 .794 2.785 2 3.5c.61 .355 1.28 .5 2 .5h4c.72 0 1.39 -.145 2 -.5c1.206 -.715 2 -2.02 2 -3.5c0 -2.336 -2.858 -4 -6 -4z" /><path d="M12 3c-3.142 0 -6 1.664 -6 4c0 1.48 .794 2.785 2 3.5c.61 .355 1.28 .5 2 .5h4c.72 0 1.39 -.145 2 -.5c1.206 -.715 2 -2.02 2 -3.5c0 -2.336 -2.858 -4 -6 -4z" /></svg>,
        js: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" /><path d="M7.5 8h3v8l-2.5 .8" /><path d="M16.5 8h-2.5a0.5 .5 0 0 0 -.5 .5v3a0.5 .5 0 0 0 .5 .5h1.5a0.5 .5 0 0 1 .5 .5v3a0.5 .5 0 0 1 -.5 .5h-2.5" /></svg>,
        git: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M6 8v8a2 2 0 0 0 2 2h4" /><circle cx="18" cy="6" r="2" /><path d="M18 8v8" /></svg>,
        node: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 9v8.004a2 2 0 0 0 2.002 2h2.002a2 2 0 0 0 2 -2v-8.004" /><path d="M4 14v-5a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" /></svg>,
        camera: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><circle cx="12" cy="13" r="3" /></svg>
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                
                {/* --- Skills Section --- */}
                <section className="mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mt-20 mb-16">My Skills</h1>
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            <SkillCard icon={skillIcons.react} name="React" />
                            <SkillCard icon={skillIcons.js} name="JavaScript (ES6+)" />
                            <SkillCard icon={skillIcons.tailwind} name="Tailwind CSS" />
                            <SkillCard icon={skillIcons.node} name="Node.js" />
                            <SkillCard icon={skillIcons.git} name="Git & GitHub" />
                            <SkillCard icon={skillIcons.camera} name="Photography" />
                        </div>
                    </div>
                </section>

                {/* --- Projects Section --- */}
                <section>
                    <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-8">My Projects</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map(project => (
                            <ProjectCard key={project.title} {...project} />
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}

export default AboutMe;
