import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';

const Projects: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextProject = () => {
        setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
    };

    const prevProject = () => {
        setActiveIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
    };

    return (
        <section id="projects" className="py-10 bg-slate-50 dark:bg-slate-950 overflow-hidden min-h-screen flex flex-col justify-center relative">
            <div className="container mx-auto px-6 z-10">

                {/* Title Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                        Featured <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-indigo-600">Works</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Explore a curated collection of my technical projects and creative solutions.
                    </p>
                </div>

                {/* 3D Carousel Container */}
                <div className="relative h-112.5 md:h-125 flex items-center justify-center perspective-1000">
                    {PROJECTS_DATA.map((project, index) => {
                        const offset = index - activeIndex;
                        const isActive = index === activeIndex;

                        return (
                            <motion.div
                                key={project.id}
                                className={`absolute w-[85vw] md:w-150 h-[55vh] md:h-100 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 cursor-pointer transition-shadow duration-300 ${isActive ? 'shadow-primary-500/20 z-10' : 'hover:brightness-110'}`}
                                onClick={() => setActiveIndex(index)}
                                animate={{
                                    rotateY: offset * 45,
                                    scale: 1 - Math.abs(offset) * 0.15,
                                    x: offset === 0 ? 0 : offset * 350,
                                    z: -Math.abs(offset) * 100,
                                    opacity: 1 - Math.abs(offset) * 0.3,
                                    zIndex: 100 - Math.abs(offset)
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20
                                }}
                            >
                                {/* Full Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    {/* Dark Overlay for Readability */}
                                    <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${isActive ? 'bg-slate-900/60' : 'bg-slate-900/30'}`} />
                                </div>

                                {/* Content Overlay */}
                                <div className={`relative h-full p-8 flex flex-col justify-end transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`inline-block px-2 py-1 backdrop-blur-md rounded text-xs font-mono uppercase tracking-wider border ${project.status === 'Completed'
                                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-bold mb-2 text-white drop-shadow-md">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-200 text-sm leading-relaxed mb-6 line-clamp-3 max-w-lg drop-shadow-sm">
                                        {project.fullDescription || project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.techStack.slice(0, 5).map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs backdrop-blur-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 text-sm transition-colors shadow-lg pointer-events-auto"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            View Project <ArrowUpRight size={18} />
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors pointer-events-auto backdrop-blur-md"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github size={20} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-center gap-6 mt-12">
                    <button
                        onClick={prevProject}
                        className="p-4 rounded-full bg-transparent border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-110 active:scale-95"
                        aria-label="Previous project"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextProject}
                        className="p-4 rounded-full bg-transparent border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-110 active:scale-95"
                        aria-label="Next project"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Projects;
